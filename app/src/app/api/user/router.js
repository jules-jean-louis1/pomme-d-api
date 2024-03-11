import { NextResponse } from "next/server";

// Handles GET requests to /api/user

// export async function GET(request) {
//   try {
//     const query = "SELECT * FROM user";
//     db.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//         return NextResponse.json({ message: "Error" });
//       }
//       return NextResponse.json(result);
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Error" });
//   }
// }
export async function GET(request) {
  // ...
  return NextResponse.json({ message: "Hello World" });
}
