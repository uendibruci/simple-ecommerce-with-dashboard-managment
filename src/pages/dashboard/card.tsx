import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const { Meta } = Card;
interface Props {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  price: string;
  image: string;
}

const Product: React.FC<Props> = (props) => {
  return (
    <div className="product">
      <Card
        hoverable
        style={{ width: 230, height: 430 }}
        cover={<img alt="example" src={props.image} />}
      >
        <Meta title={props.title} description={props.description} />
        <div className="price">
          <p>{props.price} </p>
        </div>

        <div className="addToCart">
          <div className="showMore">
            <Link to={`/product/${props.id}`}>
              <Button id="button__showMore" type="primary">
                Show More
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Product;
