import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Row, Col } from "react-bootstrap";
import { Form, Button, ButtonGroup, Card } from "react-bootstrap";
import { BsFacebook } from "react-icons/bs";
import { TfiTwitterAlt } from "react-icons/tfi";
import { AiFillGoogleCircle } from "react-icons/ai";

// import sendgrid from "@sendgrid/mail";

export default function Login() {
  const SERVICE_ID = "service_1d3e879";
  const TEMPLATE_ID = "template_kigf91i";

  const [mail, setMail] = useState("");
  const { push } = useRouter();
  const { data: session } = useSession();
  console.log(session);

  //   sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { error } = await signIn("email", {
        // mail,
        // redirect: false,
        // callbackUrl: `http://localhost:3000`,
        email: mail,
        options: {
          emailRedirectTo: "http://localhost:3000",
        },
      });
      console.log("ERROR", error);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (session) {
      push("/");
    }
  }, [session]);

  return (
    <>
      <div className="container">
        {!session && (
          <div className="container-fluid">
            <Row>
              <Col md={12}>
                {/* <div className="container d-flex mb-4 justify-content-end">
                  <text className="language-text">English</text>
                </div> */}
              </Col>
            </Row>
            <Row className="m-4 p-4 ">
              <Col md={2}></Col>
              <Col md={8}>
                <Card className="rounded">
                  <Card.Body>
                    <div
                      className="language"
                      style={{
                        padding: "50px",
                      }}
                    >
                      <div className="signinfont w-100 p-2 mb-4 text-center fw-light fst-italic">
                        <h3>Sign In</h3>
                      </div>

                      <Form className="mb-4 p-4" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="p-2"
                            onChange={(event) => {
                              setMail(event.target.value);
                            }}
                          />
                        </Form.Group>
                        <Button
                          variant="secondary  w-100 magic-btn"
                          size="md"
                          type="submit"
                        >
                          Get magic Link
                        </Button>
                      </Form>
                      <div className="mb-2 p-4">
                        <span className="flexer mb-2">Or continue with</span>
                      </div>
                      <ButtonGroup
                        className="mb-2 w-100"
                        aria-label="First group"
                      >
                        <Button
                          className="mx-2"
                          onClick={() =>
                            signIn("google", {
                              callbackUrl: "http://localhost:3000/",
                            })
                          }
                        >
                          {" "}
                          <AiFillGoogleCircle />
                        </Button>
                        <Button
                          className="mx-2"
                          onClick={() =>
                            signIn("twitter", {
                              callbackUrl: "http://localhost:3000/",
                            })
                          }
                        >
                          <TfiTwitterAlt />
                        </Button>
                        <Button
                          onClick={() =>
                            signIn("facebook", {
                              callbackUrl: "http://localhost:3000/",
                            })
                          }
                        >
                          <BsFacebook />
                        </Button>{" "}
                      </ButtonGroup>

                      <div className="m-4 text-center">
                        if you dont have an account you can{" "}
                        <a href="#"> Register here</a>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={2}></Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}
