import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { v4 as uuid } from "uuid";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "redux/userReducer";
import { editUser } from "redux/userReducer";

function User() {
  const location = useLocation();
  console.log("location", location);

  const { Formik } = formik;
  const history = useHistory();
  const dispatch = useDispatch();
  const unique_id = uuid();

  const users = useSelector((state) => state.users);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const handleSubmit = (values) => {
    // console.log(values);                                   //yahan hamri vaues arahi hain jo neche input se li hain
    alert("submitted");
    if (location?.state) {
      dispatch(editUser(values));
      debugger;
    } else {
      dispatch(addUser(values)); //values me mera pura data arha ha like firstname lastname e
    }

    history.push("/admin/userdetails");
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        id: unique_id,
        firstName: location?.state?.existUser
          ? location?.state?.existUser?.firstName
          : "",
        lastName: location?.state?.existUser
          ? location?.state?.existUser?.lastName
          : "",
        username: location?.state?.existUser
          ? location?.state?.existUser?.username
          : "",
        city: location?.state?.existUser
          ? location?.state?.existUser?.city
          : "",
        state: location?.state?.existUser
          ? location?.state?.existUser?.state
          : "",
        zip: location?.state?.existUser ? location?.state?.existUser?.zip : "",
        terms: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />

              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
              />

              <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default User;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
// import { addUser, editUser } from "redux/userReducer";

// import {
//   Badge,
//   Button,
//   Card,
//   Form,
//   Navbar,
//   Nav,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";
// import * as formik from "formik";
// import * as Yup from "yup";

// function User() {
//   const { Formik } = formik;

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [isAdding, setIsAdding] = useState("");

//   const users = useSelector((state) => state.users);
//   const location = useLocation();
//   const singleUser = location?.state?.user;

//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [postalcode, setPostalCode] = useState("");
//   const [aboutme, setAboutMe] = useState("");
//   const [singleUserData, setSingleUserData] = useState(null);

//   // useEffect(() => {
//   //   if (singleUser) {
//   //     const existingUser = users.find((user) => user.id === singleUser.id);
//   //     setSingleUserData(existingUser);
//   //   } else {
//   //     setSingleUserData(null);
//   //   }
//   // }, [singleUser, users]);

//   const initialValues = {
//     username: "",
//     email: "",
//     firstname: "",
//     lastname: "",
//     address: "",
//     city: "",
//     country: "",
//     postalcode: "",
//     aboutme: "",
//   };
//   const validationSchema = Yup.object().shape({
//     username: Yup.string().required("UserName is required"),
//     email: Yup.string().required("Email is required"),
//     firststname: Yup.string().required("FirststName is required"),
//     lastname: Yup.string().required("LastName is required"),
//     address: Yup.string().required("Address is required"),
//     city: Yup.string().required("City is required"),
//     country: Yup.string().required("Country is required"),
//     postalcode: Yup.string().required("PostalCode is required"),
//     aboutme: Yup.string().required("About-Me is required"),
//   });

//   // const handleSubmit = (values) => {
//   //   alert("Data Submitted");
//   //   debugger;
//   //   dispatch(
//   //     addUser({
//   //       username: "",
//   //       email: "",
//   //       firstname: "",
//   //       lastname: "",
//   //       address: "",
//   //       city: "",
//   //       country: "",
//   //       postalcode: "",
//   //       aboutme: "",
//   //     })
//   //   );
//   //   console.log(values);
//   //   history.push("/admin/userdetails");

//   //  event.preventDefault();

//   // const newUserData = {
//   //   id: users.length > 0 ? users[users.length - 1].id + 1 : 0,
//   //   // username,
//   //   // email,
//   //   // firstname,
//   //   // lastname,
//   //   // address,
//   //   // city,
//   //   // country,
//   //   // postalcode,
//   //   // aboutme,
//   // };
//   // };

//   // const handleEdit = (event) => {
//   //   event.preventDefault();

//   //   const editedUserData = {
//   //     ...singleUserData,
//   //     username,
//   //     email,
//   //     firstname,
//   //     lastname,
//   //     address,
//   //     city,
//   //     country,
//   //     postalcode,
//   //     aboutme,
//   //   };

//   //   dispatch(editUser(editedUserData));
//   //   history.push("/admin/userdetails");
//   // };

//   // const renderAdd = () => {
//   //   return (
//   //     <>

//   //     </>
//   //   );
//   // };

//   return (
//     <>
//       <Container fluid>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={console.log}
//         >
//           {({ handleSubmit, handleChange, values, touched, errors }) => (
//             <Row>
//               <Col md="8">
//                 <Form noValidate onSubmit={handleSubmit}>
//                   <Card>
//                     <Card.Header>
//                       <Card.Title as="h4">Edit Profile</Card.Title>
//                     </Card.Header>
//                     <Card.Body>
//                       <Row>
//                         <Col className="pr-1" md="5">
//                           <Form.Group>
//                             <label>Company </label>
//                             <Form.Control
//                               defaultValue="Appsgenii Technologies"
//                               disabled
//                               placeholder="Company"
//                               type="text"
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>

//                         <Col className="px-1" md="3">
//                           {/*Username field*/}
//                           <Form.Group>
//                             <label>Username</label>
//                             <Form.Control
//                               type="text"
//                               id="username"
//                               name="username"
//                               value={values.username}
//                               onChange={handleChange}
//                               isValid={touched.useruame && !errors.username}
//                               placeholder="Username"
//                               // value={
//                               //     singleUserData
//                               //      ? singleUserData.username
//                               //      : username
//                               //   }
//                               // onChange={(e) => setUserName(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>

//                         <Col className="pl-1" md="4">
//                           {/*email field*/}
//                           <Form.Group>
//                             <label> Email address </label>
//                             <Form.Control
//                               type="email"
//                               id="email"
//                               name="email"
//                               value={values.email}
//                               onChange={handleChange}
//                               isValid={touched.email && !errors.email}
//                               placeholder="Email"
//                               // value={
//                               //    singleUserData ? singleUserData.email : email
//                               // }
//                               // onChange={(e) => setEmail(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col className="pr-1" md="6">
//                           {/*First Name field*/}
//                           <Form.Group>
//                             <label>First Name</label>
//                             <Form.Control
//                               type="text"
//                               id="firstname"
//                               name="firstname"
//                               value={values.firstname}
//                               onChange={handleChange}
//                               isValid={touched.firstname && !errors.firstname}
//                               // value={
//                               //   singleUserData
//                               //     ? singleUserData.firstname
//                               //     : firstname
//                               // }
//                               // onChange={(e) => setFirstName(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>

//                         <Col className="pl-1" md="6">
//                           {/*Last Name field*/}
//                           <Form.Group>
//                             <label>Last Name</label>
//                             <Form.Control
//                               type="text"
//                               id="lastname"
//                               name="lastname"
//                               value={values.lastname}
//                               onChange={handleChange}
//                               isValid={touched.lastname && !errors.lastname}
//                               placeholder="Last Name"
//                               // value={
//                               //   singleUserData
//                               //     ? singleUserData.lastname
//                               //     : lastname
//                               // }
//                               // onChange={(e) => setLastName(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col md="12">
//                           {/*Address Name field*/}
//                           <Form.Group>
//                             <label>Address</label>
//                             <Form.Control
//                               type="text"
//                               id="address"
//                               name="address"
//                               value={values.address}
//                               onChange={handleChange}
//                               isValid={touched.address && !errors.address}
//                               placeholder="Home Address"
//                               // value={
//                               //   singleUserData
//                               //     ? singleUserData.address
//                               //     : address
//                               // }
//                               // onChange={(e) => setAddress(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col className="pr-1" md="4">
//                           {/*City Name field*/}
//                           <Form.Group>
//                             <label>City</label>
//                             <Form.Control
//                               type="text"
//                               id="city"
//                               name="city"
//                               value={values.city}
//                               onChange={handleChange}
//                               isValid={touched.city && !errors.city}
//                               placeholder="City"
//                               // value={
//                               //   singleUserData ? singleUserData.city : city
//                               // }
//                               // onChange={(e) => setCity(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>

//                         <Col className="px-1" md="4">
//                           {/*Country Name field*/}
//                           <Form.Group>
//                             <label>Country</label>
//                             <Form.Control
//                               type="text"
//                               id="country"
//                               name="country"
//                               value={values.country}
//                               onChange={handleChange}
//                               isValid={touched.country && !errors.country}
//                               placeholder="Country"
//                               // value={
//                               //   singleUserData
//                               //     ? singleUserData.country
//                               //     : country
//                               // }
//                               // onChange={(e) => setCountry(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>

//                         <Col className="pl-1" md="4">
//                           {/*Postal Code Name field*/}
//                           <Form.Group>
//                             <label>Postal Code</label>
//                             <Form.Control
//                               type="text"
//                               id="postalcode"
//                               name="postalcode"
//                               value={values.postalcode}
//                               onChange={handleChange}
//                               isValid={touched.postalcode && !errors.postalcode}
//                               placeholder="ZIP Code"
//                               // value={
//                               //   singleUserData
//                               //     ? singleUserData.postalcode
//                               //     : postalcode
//                               // }
//                               // onChange={(e) => setPostalCode(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col md="12">
//                           <Form.Group>
//                             <label>About Me</label>
//                             <Form.Control
//                               cols="80"
//                               type="text"
//                               id="aboutme"
//                               name="aboutme"
//                               value={values.aboutme}
//                               onChange={handleChange}
//                               isValid={touched.aboutme && !errors.aboutme}
//                               placeholder="Here can be your description"
//                               rows="4"
//                               as="textarea"
//                               // value={
//                               //   singleUserData
//                               //     ? singleUserData.aboutme
//                               //     : aboutme
//                               // }
//                               // onChange={(e) => setAboutMe(e.target.value)}
//                             ></Form.Control>
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Button
//                         type="submit"
//                         className="btn-fill pull-right"
//                         variant="info"
//                       >
//                         Update Profile
//                       </Button>

//                       <div className="clearfix"></div>
//                     </Card.Body>
//                   </Card>
//                 </Form>
//               </Col>

//               <Col md="4">
//                 <Card className="card-user">
//                   <div className="card-image">
//                     <img
//                       alt="..."
//                       src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
//                     ></img>
//                   </div>
//                   <Card.Body>
//                     <div className="author">
//                       <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                         <img
//                           alt="..."
//                           className="avatar border-gray"
//                           src={require("assets/img/faces/face-3.jpg")}
//                         ></img>
//                         <h5 className="title">Mike Andrew</h5>
//                       </a>
//                       <p className="description">michael24</p>
//                     </div>
//                     <p className="description text-center">
//                       "Lamborghini Mercy <br></br>
//                       Your chick she so thirsty <br></br>
//                       I'm in that two seat Lambo"
//                     </p>
//                   </Card.Body>
//                   <hr></hr>
//                   <div className="button-container mr-auto ml-auto">
//                     <Button
//                       className="btn-simple btn-icon"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       variant="link"
//                     >
//                       <i className="fab fa-facebook-square"></i>
//                     </Button>
//                     <Button
//                       className="btn-simple btn-icon"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       variant="link"
//                     >
//                       <i className="fab fa-twitter"></i>
//                     </Button>
//                     <Button
//                       className="btn-simple btn-icon"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       variant="link"
//                     >
//                       <i className="fab fa-google-plus-square"></i>
//                     </Button>
//                   </div>
//                 </Card>
//               </Col>
//             </Row>
//           )}
//         </Formik>
//       </Container>
//     </>
//   );
// }

// export default User;

// // const [usersData, setUsersData] = useState({
// //   userName: "",
// //   email: "",
// //   lastName: "",
// //   address: "",
// //   city: "",
// //   country: "",
// //   postalCode: "",
// //   aboutMe: "",
// // });
