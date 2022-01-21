// import { useState } from "react";

// const usePhoneNumber = (value) => {
//   return;
//   function formatPhoneNumber(value) {
//     if (!value) return value;

//     let phoneNumber = value.replace(/[^\d]/g, "");

//     const phoneNumberLength = phoneNumber.length;

//     if (phoneNumberLength < 4) return phoneNumber;

//     if (phoneNumberLength < 7) {
//       return (phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
//         3
//       )}`);
//     }

//     return (phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
//       3,
//       6
//     )}-${phoneNumber.slice(6, 10)}`);
//   }
// };

// export default usePhoneNumber;
