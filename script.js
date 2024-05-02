// // function elements(tag, classname, id, text) {
// //   const tags = document.createElement(tag);
// //   tags.classList = classname;
// //   tags.id = id;
// //   tags.innerHTML = text;
// //   return tags;
// // }

// // const container = elements("div", "container", "container", "");
// // const heading = elements("h1", "container-fluid text-center", "", "Dog Facts");
// // const row = elements("div", "row", "", ""); // Assuming you want to create a row

// // fetch("https://some-random-api.ml/facts/dog")
// //   .then(response => response.json())
// //   .then(data => {
// //     const fact = data.fact;
    
// //     const factParagraph = elements("p", "col", "", fact);
// //     row.appendChild(factParagraph); // Append the fact paragraph to the row
    
// //     container.appendChild(heading);
// //     container.appendChild(row); // Append the row to the container
// //     document.body.appendChild(container); // Append the container to the body
// //   })
// //   .catch(error => {
// //     console.error("Error fetching dog facts:", error);
// //   });

// function elements(tag, classname, id, text) {
//   const tags = document.createElement(tag);
//   tags.classList = classname;
//   tags.id = id;
//   tags.innerHTML = text;
//   return tags;
// }

// const container = elements("div", "container", "container", "");
// const heading = elements("h1", "container-fluid text-center", "", "Dog Facts");
// const row = elements("div", "row", "", ""); // Assuming you want to create a row

// fetch("http://dog-api.kinduff.com/api/facts?number=5 ")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log("Received data:", data);
//     const fact = data.fact;
    
//     const factParagraph = elements("p", "col", "", fact);
//     row.appendChild(factParagraph); // Append the fact paragraph to the row
    
//     container.appendChild(heading);
//     container.appendChild(row); // Append the row to the container
//     document.body.appendChild(container); // Append the container to the body
//   })
//   .catch(error => {
//     console.error("Error fetching dog facts:", error);
//   });

// function elements(tag, classname, id, text) {
//   const tags = document.createElement(tag);
//   tags.classList = classname;
//   tags.id = id;
//   tags.innerHTML = text;
//   return tags;
// }

// const container = elements("div", "container", "container", "");
// const heading = elements("h1", "container-fluid text-center", "", "Dog Facts");
// const row = elements("div", "row", "", ""); // Assuming you want to create a row

// fetch("https://dog.ceo/api/breeds/list/all")
//   .then(response => response.json())
//   .then(data => {
//     const breeds = Object.keys(data.message); // Extracting breeds from the response
//     breeds.forEach(breed => {
//       const breedParagraph = elements("p", "col", "", breed);
//       row.appendChild(breedParagraph); // Append each breed paragraph to the row
//     });
//     container.appendChild(heading);
//     container.appendChild(row); // Append the row to the container
//     document.body.appendChild(container); // Append the container to the body
//   })
//   .catch(error => {
//     console.error("Error fetching dog breeds:", error);
//   });

function elements(tag, classname, id, text) {
  const tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

function createCard(breed, imageUrl, description) {
  const card = elements("div", "card", "card", "");
  const image = elements("img", "card-img-top", "image", "");
  image.src = imageUrl;
  const cardBody = elements("div", "card-body", "", "");
  const breedTitle = elements("h5", "card-title", "", breed);
  const breedDescription = elements("p", "card-text", "", description);

  cardBody.appendChild(breedTitle);
  cardBody.appendChild(breedDescription);
  card.appendChild(image);
  card.appendChild(cardBody);

  return card;
}

const container = elements("div", "container", "container", "");
const heading = elements("h1", "container-fluid text-center", "", "Dog Breeds");
const row = elements("div", "row", "", "");

fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(data => {
    const breeds = Object.keys(data.message); // Extracting breeds from the response

    breeds.forEach(breed => {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(imageData => {
          fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`)
            .then(response => response.json())
            .then(descriptionData => {
              const breedCard = createCard(breed, imageData.message, descriptionData.extract);
              row.appendChild(breedCard);
            })
            .catch(error => {
              console.error("Error fetching breed description:", error);
            });
        })
        .catch(error => {
          console.error("Error fetching breed image:", error);
        });
    });

    container.appendChild(heading);
    container.appendChild(row); // Append the row to the container
    document.body.appendChild(container); // Append the container to the body
  })
  .catch(error => {
    console.error("Error fetching dog breeds:", error);
  });
