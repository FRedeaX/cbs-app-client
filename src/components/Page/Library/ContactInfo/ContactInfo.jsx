import React, { Fragment } from "react";
import { Email } from "./Email/Email";
import { Schedule } from "./Schedule/Schedule";
import { Telefon } from "./Telefon/Telefon";

const ContactInfo = (props) => {
  const { schedule, email, telefon } = props;

  return (
    <Fragment>
      {schedule && <Schedule schedule={schedule} />}
      {email && telefon ? (
        <div>
          {email && <Email email={email} />}
          {telefon && <Telefon telefon={telefon} />}
        </div>
      ) : email ? (
        <Email email={email} />
      ) : telefon ? (
        <Telefon telefon={telefon} />
      ) : null}
    </Fragment>
  );
};

export default ContactInfo;
