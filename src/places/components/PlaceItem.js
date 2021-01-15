import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ShareButtons from "../../shared/components/Navigation/ShareButtons";

function PlaceItem(props) {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showConfirmHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelConfirmHandler = async (event) => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        onCancel={cancelConfirmHandler}
        header="Confirm deletion"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button margin onClick={confirmDeleteHandler}>
              Delete
            </Button>
            <Button inverse margin onClick={cancelConfirmHandler}>
              Cancel
            </Button>
          </>
        }
      >
        <p>
          Do you really want to delete this place? It will be deleted forever.
        </p>
      </Modal>
      <li className="place-item">
        <Card unpadded>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
            <ShareButtons single />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h4>{props.address}</h4>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openMapHandler}>View on map</Button>
            {props.creatorId === auth.userId && (
              <>
                {" "}
                <Button inverse to={`/places/${props.id}`}>
                  Edit
                </Button>
                <Button inverse onClick={showConfirmHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
          {props.viewAuthor && (
            <Link to={`/${props.creator}/places`}>
              <p className="place-item__author">
                {props.creatorId !== auth.userId
                  ? "View all places by author"
                  : "View all my places"}
              </p>
            </Link>
          )}
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
