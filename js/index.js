// regex to validate email
const regexMail = new RegExp(
  `([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])`
);
const handleName = () => {
  document.getElementById("nameErr").classList.add("hidden");
  document.getElementById("shortNameErr").classList.add("hidden");
};
const handleMail = () => document.getElementById("emailErr").classList.add("hidden");
const handleDate = () => document.getElementById("bookingDateErr").classList.add("hidden");

// function on form submit to validate user's data
const handleForm = (e) => {
  e.preventDefault();
  let err = 0;
  const params = {
    from_name: document.getElementById("name").value,
    reply_to: document.getElementById("email").value,
    date: document.getElementById("bookingDate").value,
  };
  if (params.from_name.length === 0) {
    document.getElementById("nameErr").classList.remove("hidden");
    err++;
  } else if (params.from_name.length < 3) {
    document.getElementById("shortNameErr").classList.remove("hidden");
  }
  if (!regexMail.test(params.reply_to)) {
    document.getElementById("emailErr").classList.remove("hidden");
    err++;
  }
  if (params.date.length === 0) {
    document.getElementById("bookingDateErr").classList.remove("hidden");
    err++;
  }
  if (err === 0) sendMail(params);
};

// calling EmailJS to send email 
const sendMail = (params) => {
  try {
    emailjs.send("service_mpdryvr", "template_jpnj3rk", params);
    document.getElementById("succesNotification").classList.remove("hidden");
    document.getElementById("formContent").classList.add("hidden");
  } catch (err) {
    console.error(err);
  }
};

document.getElementById("form").addEventListener("submit", handleForm);