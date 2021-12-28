import React, { useState, useEffect } from "react";
import './TabCardGrid.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { items } from "../../services/filter.js"
import { PrimaryButton } from "components/misc/Buttons.js";
import Pagination from 'react-bootstrap/Pagination'
import { authenticationService } from '../../services/authentication.service';
import { authHeader } from '../../helpers/auth-header';
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;
const Form = tw.form`text-sm max-w-sm sm:max-w-none mx-auto`
const Input = tw.input`w-full block sm:inline-block px-6 py-4 rounded tracking-wider font-bold border border-secondary-600 focus:border-secondary-300 focus:outline-none sm:rounded-r-none hover:bg-primary-600 transition duration-300 text-gray-200`

const Button = tw(PrimaryButton)`w-full sm:w-auto mt-6 sm:mt-0 sm:rounded-l-none py-4 bg-green-500 text-gray-100 hocus:bg-green-700 hocus:text-gray-300 border border-green-500 hocus:border-green-700`
const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  heading = "",
  tabs = {
    すべての服: [],
    おすすめ服: [],
  }
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const [localTabs, setLocalTabs] = useState(tabs);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageItems, setPageItems] = useState([]);
  const tabsKeys = Object.keys(localTabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);
  const [recommend, setRecommend] = useState([]);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999999);
  const reg = /^\d+$/;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await getPage(currentPage);
  }
  const handleInputMin = (event) => {
    event.preventDefault();
    setMin(event.target.value);

  }
  const handleInputMax = (event) => {
    event.preventDefault();
    setMax(event.target.value);

  }

  const getPage = async (pageNumber) => {
    let data = await items.filter(name, species, min, max, pageNumber);
    setCurrentPage(data.current_page);
    let tempItems = []
    for (let number = 1; number <= Math.ceil(data.total / data.per_page); number++) {
      tempItems.push(number);
    }
    setPageItems(tempItems);
    console.log(tempItems)
    console.log(pageItems)
    let tempArray = [];
    for (let i = 0; i < data.data.length; i++) {
      let temp = {};
      temp.imageSrc = data.data[i].img_url;
      temp.title = data.data[i].name;
      temp.price = data.data[i].price.toString() + "円";
      temp.url = "products/" + data.data[i].id.toString();
      tempArray.push(temp);
    }
    let tempArray2 = [];
    if (authenticationService.currentUserValue) {
      let recommendData = await items.recommend(authHeader());
      for (let i = 0; i < recommendData.length; i++) {
        let temp = {};
        temp.imageSrc = recommendData[i].img_url;
        temp.title = recommendData[i].name;
        temp.price = recommendData[i].price.toString() + "円";
        temp.url = "products/" + recommendData[i].id.toString();
        tempArray2.push(temp);
      }
    }
    setLocalTabs({ すべての服: tempArray, おすすめ服: tempArray2 });
    return data;
  }

  useEffect(() => {
    const fetchAPI = async () => {
      await getPage(1);
    }
    fetchAPI();
  }, []);
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(localTabs).map((tabName, index) => (
              <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>
        {activeTab === tabsKeys[0] &&
          <div>
            <Form onSubmit={(event) => { handleSubmit(event) }}>
              <div className="row pt-3">
                <div className="col-xl-6 col-md-12 input-form pt-2">
                  <div className="label align-self-center">製品名</div>
                  <Input placeholder="製品名" value={name} onChange={(event) => { setName(event.target.value) }} />
                </div>
                <div className="col-xl-6 col-md-12 input-form pt-2">
                  <span className="label align-self-center">カテゴリー</span>
                  <Input placeholder="カテゴリー" value={species} onChange={(event) => { setSpecies(event.target.value) }} />
                </div>
                <div className="col-xl-6 col-md-12 input-form pt-2">
                  <span className="label align-self-center">最小価格</span>
                  <Input type="number" min={0} placeholder="Input Min Price" value={min} onChange={(event) => { handleInputMin(event) }} />
                </div>
                <div className="col-xl-6 col-md-12 input-form pt-2">
                  <span className="label align-self-center">最高価格</span>
                  <Input type="number" min={min} max={999999} placeholder="Input Max Price" value={max} onChange={(event) => { handleInputMax(event) }} />
                </div>
                <div className="button-search pt-3 align-self-center">
                  <Button className="align-self-center" type="submit">調べる</Button>
                </div>
              </div>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Pagination>
                {pageItems.map((item, index) => (
                  <Pagination.Item key={item} active={item === currentPage} onClick={()=>{getPage(item)}}>
                    {item}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>

        }

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {localTabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" href={card.url} initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={card.imageSrc}>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardButton>Buy Now</CardButton>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <CardPrice>{card.price}</CardPrice>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
