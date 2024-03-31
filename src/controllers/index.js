const home = (req, res) => {
    res.status(200).send(`<h1>Express Service is Live</h1>`);
  };
  
  export default { home };
  