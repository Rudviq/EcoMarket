// function generateStarRating(rating) {
//   const fullStars = Math.floor(rating);
//   const decimalPart = rating - fullStars;
//   const filledStarWidth = Math.round(60 * decimalPart); // Width of the filled part of the star (60px is the width of a full star)
//     const emptyStarWidth = 60 - filledStarWidth; // Width of the empty part of the star

//     let starsHTML = '';

//   // let starsHTML = '';

//   // Add full stars
//   for (let i = 0; i < fullStars; i++) {
//       starsHTML += '<span class="star">&#9733;</span>'; // Full star unicode
//   }

//   // Add fraction star
//   // if (decimalPart > 0) {
//   //     // console.log("Rudvq");
//   //     const fractionWidth = 60 * decimalPart; // Width of the filled part of the star (60px is the width of a full star)
//   //     const fractionStyle = `width: ${fractionWidth}px;`; // Set the width of the filled part
//   //     starsHTML += `<span class="star" style="overflow: hidden; position: relative; display: inline-block;">`;
//   //     starsHTML += `<span class="star" style="position: absolute; clip: rect(0px, ${fractionWidth}px, 20px, 0px);">&#9733;</span>`;
//   //     starsHTML += `<span class="star" style="position: absolute; left: 0; clip: rect(0px, 60px, 20px, ${fractionWidth}px);">&#9734;</span>`;
//   //     starsHTML += `</span>`;
//   // }
//   // Add fractional star
//   starsHTML += `<span class="star" style="display: inline-block; width: ${filledStarWidth}px; overflow: hidden;">&#9733;</span>`;
//   // starsHTML += `<span class="star" style="display: inline-block; width: ${emptyStarWidth}px; overflow: hidden;">&#9734;</span>`;

//   return starsHTML;

//   // return starsHTML;
// }

// // Example usage:
// // const rating = 4.6;
// // const starRatingHTML = generateStarRating(rating);
// // console.log(starRatingHTML); // Output the generated HTML


function generateStarRating(rating) {

  const starsTotal = 5;

  const starPercentage = (rating/ starsTotal)*100;

  const starPercentageRounded = `${Math.round(starPercentage/10)*10}%`;

  // Create HTML for star rating
  const starsHTML = `
    <div class="stars-outer">
      <div class="stars-inner" style="width: ${starPercentageRounded};"></div>
    </div>
  `;

  return starsHTML;
  
}