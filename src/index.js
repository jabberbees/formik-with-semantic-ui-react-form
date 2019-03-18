import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Segment, Form, Button } from "semantic-ui-react";
import { Formik, Field, getIn } from "formik";

import "./styles.css";

const getFormikFieldError = (form, field) => {
  const { name } = field;
  const { serverValidation } = form.status || {};
  const touched = getIn(form.touched, name);
  const checkTouched = serverValidation ? !touched : touched;
  return checkTouched && getIn(form.errors, name);
};

const setFormikFieldValue = (form, name, value, shouldValidate) => {
  form.setFieldValue(name, value, shouldValidate);
  form.setFieldTouched(name, true, shouldValidate);
};

const FormField = ({ component, componentProps = {}, ...fieldProps }) => (
  <Field
    {...fieldProps}
    render={props => {
      var { id } = componentProps;
      if (!id) {
        id = "form_field_" + name;
      }
      var { field, form } = props;
      var { name, value } = field;
      const error = getFormikFieldError(form, field);
      componentProps.id = id;
      componentProps.error = error;
      const valueProps =
        typeof value === "boolean"
          ? { checked: value }
          : { value: value || "" };
      return React.createElement(component, {
        ...componentProps,
        ...field,
        ...props,
        ...valueProps,
        onChange: (e, { name, value }) => {
          setFormikFieldValue(form, name, value, true);
        },
        onBlur: form.handleBlur
      });
    }}
  />
);

const handleSubmit = values => {
  console.log("submitted");
};

const validate = values => {
  var errors = {};
  if (!values.firstName) errors.firstName = "required";
  if (!values.lastName) errors.lastName = "required";
  console.log(errors);
  return errors;
};

const required = value => {
  const result = value ? undefined : "Required";
  //console.log("required", { value, result });
  return result;
};

const MyForm = props => (
  <Formik
    initialValues={{
      firstName: "foo",
      lastName: "bar"
    }}
    enableReinitialize={false}
    validate={validate}
    onSubmit={handleSubmit}
    render={props => (
      <Form onSubmit={props.handleSubmit}>
        <FormField
          name="firstName"
          component={Form.Input}
          componentProps={{
            label: "First Name"
          }}
          validate={required}
        />

        <FormField
          name="lastName"
          component={Form.Input}
          componentProps={{
            label: "Last Name"
          }}
          validate={required}
        />

        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    )}
  />
);

function App() {
  return (
    <React.Fragment>
      <Container style={{ paddingTop: 0 }}>
        <Header as="h2" attached="top" inverted>
          My Form
        </Header>
        <Segment attached>
          <MyForm />
        </Segment>
      </Container>
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
