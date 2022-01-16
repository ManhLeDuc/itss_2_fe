import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import tw from "twin.macro";
import { useParams } from 'react-router-dom';
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { authenticationService } from '../../services/authentication.service';
const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-10 lg:py-10`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;
const Button = tw(PrimaryButtonBase)`text-sm`;
const Card = styled.div(props => [
  tw`mt-24 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-200`;
const Title = tw.h4`text-3xl font-bold text-gray-900`;
const Description = tw.p`mt-2 text-sm leading-loose `;
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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [card, setCard] = useState(testCard);
  const [isLoading, setIsLoading] = useState(true);
  const [sizeChoice, setSizeChoice] = useState("");
  const [quantityChoice, setQuantityChoice] = useState(1);
  const [sizeId, setSizeId] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  useEffect(() => {
    fetch(`https://rocky-gorge-10796.herokuapp.com/api/showFashion/${id}`)
      .then((res) => { return res.json(); })
      .then((data) => {
        setCard({
          id: data.id,
          imageSrc: data.img_url,
          subtitle: data.species,
          title: data.name,
          description: data.description,
          sizes: data.sizes,
          price: data.price,
          url: "#"
        });
        setSizeChoice(data.sizes[0].name);
        setSizeId(data.sizes[0].size_id);
        setMaxQuantity(data.sizes[0].quantity)
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
    if (!authenticationService.currentUserValue) {
      window.alert("ログインする必要がある")
      return;
    }
    if (quantityChoice < 1 || quantityChoice > maxQuantity) {
      window.alert("無効入力");
      return;
    }
    let alo = localStorage.getItem('carts');
    let storedProducts;
    if (alo) {
      storedProducts = JSON.parse(alo);
    } else {
      storedProducts = {};
    }
    if (storedProducts[`${card.id}+${sizeId}`]) {
      storedProducts[`${card.id}+${sizeId}`].quantity += quantityChoice;
      if (storedProducts[`${card.id}+${sizeId}`].quantity > maxQuantity) {
        window.alert("無効入力");
        return;
      }
    } else {
      storedProducts[`${card.id}+${sizeId}`] = { id: card.id, size_id: sizeId, name: card.title, image_url: card.imageSrc, price: card.price, size: sizeChoice, quantity: quantityChoice }
    }
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
                <div className="col-40 ip-title" style={{textAlign:"left"}}>価格:</div>
                <div className="col-60 ip-title" style={{textAlign:"center",fontWeight: "bold"}}>{numberWithCommas(card.price)}円</div>
                <div className="col-40 ip-title" style={{textAlign:"left"}}>サイズ:</div>
                <div className="col-60 ip-title" style={{textAlign:"center",fontWeight: "bold"}}>{getCardSizes(card.sizes)}</div>
                <label>
                  <div className="col-40 ip-title" style={{textAlign:"left"}}>買うサイズ: </div>
                  <select className="col-60 ip-box"
                    name="size"
                    onChange={(event) => {
                      setSizeChoice(card.sizes[parseInt(event.target.value)].name);
                      setSizeId(card.sizes[parseInt(event.target.value)].size_id);
                      setMaxQuantity(card.sizes[parseInt(event.target.value)].quantity)
                    }}
                  >
                    {card.sizes.map((size, index) => (<option value={index}>{size.name}</option>))}

                  </select>
                </label>
                <div className="col-40 ip-title" style={{textAlign:"left"}}>最大数量:</div>
                <div className="col-60 ip-title" style={{textAlign:"center",fontWeight: "bold"}}>{maxQuantity}</div>
                <label>
                  <div className="col-40 ip-title" style={{textAlign:"left"}}>買う数量: </div>
                  <input className="col-60 ip-box"
                    name="quantity"
                    type="number"
                    value={quantityChoice}
                    min={1}
                    onChange={(event) => { if (event.target.value > 0) { setQuantityChoice(parseInt(event.target.value)) } }} />
                </label>
                <br />
                <br />
                <Button onClick={handleAdd}><i className="fa fa-shopping-cart" aria-hidden="true">ショッピングカートに追加</i></Button>
              </Details>
            </Card>
            : <div></div>}
        </Content>
      </SingleColumn>
    </Container>
  );
};
