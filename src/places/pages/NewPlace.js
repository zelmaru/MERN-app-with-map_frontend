import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./PlaceForm.css";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

function NewPlace(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [formState, changeHandler] = useForm({
    image: { value: "", isValid: false },
    title: { value: "", isValid: false },
    address: { value: "", isValid: false },
    description: { value: null, isValid: false },
  });
  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("creator", auth.userId);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form action="" className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Add a New Place</h2>
        <ImageUpload center id="image" onInput={changeHandler} />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="The title must be filled out."
          onInput={changeHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address or coordinates"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="The address must be filled out."
          onInput={changeHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="The description must contain at least 5 characters."
          onInput={changeHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Add place
        </Button>
      </form>
    </>
  );
}

export default NewPlace;
