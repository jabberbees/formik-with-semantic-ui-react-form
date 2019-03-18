## Motivation

While creating my first forms for React single page app, I struggled to piece together a solution that combined Formik and Semantic-UI Rect components.

I had a look at existing solutions but found none that satisfied both my needs to create something that works and to understand what I was doing.

I pieced this solution together using bits and pieces from several sources.

The key piece is the FormField component in index.js which provides all the glue between a Formik Field and a Semantic-UI React component:

```
import { Form } from "semantic-ui-react";
import { Formik } from "formik";

  <Formik
    ...
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
```

component is the Semantic-UI React component (here: Semantic-UI React's Form.Input).
componentProps are passed directly to the wrapped component.

All other props are passed to the generated Formik field.

## How to use

In the project directory, run:

```
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Inspirations

[Usage with semantic ui #148](https://github.com/jaredpalmer/formik/issues/148)

[formik-semantic-ui](https://github.com/turner-industries/formik-semantic-ui)

[React Form using Formik, Material-UI and Yup](https://dev.to/finallynero/react-form-using-formik-material-ui-and-yup-2e8h)
