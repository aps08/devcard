function Sample({ route }) {
  switch (route) {
    case "personal":
      return <>personal</>;
    case "professional":
      return <>professional</>;
    case "account":
      return <>account</>;
    case "orders":
      return <>orders</>;
    case "gifts":
      return <>gifts</>;
    default:
      return <>personal</>;
  }
}

export default Sample;
