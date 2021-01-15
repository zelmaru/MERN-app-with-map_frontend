import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceForm.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

function UpdatePlace(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      address: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/place/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: { value: responseData.place.title, isValid: true },
            address: { value: responseData.place.address, isValid: true },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const submitUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          address: formState.inputs.address.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form action="" className="place-form" onSubmit={submitUpdateHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="The title must be filled out."
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Address or coordinates"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="The address must be filled out."
            onInput={inputHandler}
            value={loadedPlace.address}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="The description must contain at least 5 characters."
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Save changes
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
