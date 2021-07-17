import React from "react";
import { connect } from "react-redux";
import CollectionItemComponent from "../../components/collection-item/CollectionItem.component";
import { selectCollection } from "../../redux/shop/shop.selectors";
import "./Collection.styles.scss";

const CollectionPage = ({ match,collection }) => {
  console.log(collection);
  const {title,items}=collection;
  return (
    <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
            {items.map(item => <CollectionItemComponent key={item.id} item={item}/>)}
        </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionID)(state),
});
export default connect(mapStateToProps)(CollectionPage);
