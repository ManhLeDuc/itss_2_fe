import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import tw from "twin.macro";
import { useParams } from 'react-router-dom';
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-10 lg:py-10`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Card = styled.div(props => [
  tw`mt-24 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-3xl font-bold text-gray-900`;
const Description = tw.p`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

export default () => {
  const { id } = useParams();

  const testCard =
  {
    imageSrc:
      "",
    subtitle: "",
    title: "",
    description:
      "",
    url: "#",
    sizes: [],
    price: "",
  };

  const [card, setCard] = useState(testCard);
  const [isLoading, setIsLoading] = useState(true);
  const [sizeChoice, setSizeChoice] = useState("");
  const [quantityChoice, setQuantityChoice] = useState(1);

  useEffect(() => {
    fetch(`https://rocky-gorge-10796.herokuapp.com/api/showFashion/${id}`)
      .then((res) => { return res.json(); })
      .then((data) => {
        setCard({
          imageSrc: data.img_url,
          subtitle: data.species,
          title: data.name,
          description: data.description,
          sizes: data.sizes,
          price: data.price,
          url: "#"
        });
        setIsLoading(false);

        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const getCardSizes = (sizes) => {
    var string = ""
    sizes.forEach(size => { string += `${size.name} ` });
    return string
  }

  const handleAdd = () => {
    if(quantityChoice < 1){
      window.alert("Invalid Input");
      return;
    }
    let alo = localStorage.getItem('carts');
    let storedProducts;
    if(alo){
      storedProducts = JSON.parse(alo);
    } else{
      storedProducts = [];
    }    
    storedProducts.push({name: card.title, image_url: card.imageSrc, price:card.price , size: sizeChoice, quantity: quantityChoice})
    localStorage.setItem('carts', JSON.stringify(storedProducts));
    window.location.href = "/cart"
  }

  return (
    <Container>
      <SingleColumn>
        <Content>
          {!isLoading
            ? <Card>
              <Image imageSrc={card.imageSrc} />
              <Details>
                <Subtitle>{card.subtitle}</Subtitle>
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
                <Description>Price {card.price}</Description>
                <div>Size: {getCardSizes(card.sizes)}</div>
                <label>
                  <div className="col-40 ip-title">Size: </div>
                  <select className="col-60 ip-box"
                    name="size"
                    value={sizeChoice}
                    onChange={(event)=>{setSizeChoice(event.target.value)}}
                  >
                    {card.sizes.map((size,index)=>(<option value={size.name}>{size.name}</option>))}
                    
                  </select>
                </label>
                <br />
                <label>
                  <div className="col-40 ip-title">Quantity: </div>
                  <input className="col-60 ip-box"
                    name="quantity"
                    type="number"
                    value={quantityChoice}
                    min={1}
                    onChange={(event)=>{if(event.target.value>0){setQuantityChoice(event.target.value)}}} />
                </label>
                <br />
                <Link onClick={handleAdd}>Add</Link>
              </Details>
            </Card>
            : <div></div>}
        </Content>
      </SingleColumn>
    </Container>
  );
};
