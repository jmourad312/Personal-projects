import React from "react";
import CollectionsOverviewComponent from "../../components/collections-overview/CollectionsOverview.component";
import "./ShopPage.component.scss";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/Collection.component";
const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route
      exact
      path={`${match.path}`}
      component={CollectionsOverviewComponent}
    />
    <Route path={`${match.path}/:collectionID`} component={CollectionPage} />
  </div>
);

export default ShopPage;
