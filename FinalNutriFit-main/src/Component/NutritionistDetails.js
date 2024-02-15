import React from 'react';

const NutritionistDetails = ({ dash }) => {
  
  return (
    <div class="container mx-auto p-8">
      <h2 class="text-2xl font-bold mb-4 text-center">Nutritionist Details</h2>
      <table class="table-auto w-2/3 mx-auto">
        <tbody>
          <tr>
            <td class="border px-4 py-2 font-semibold">Name</td>
            <td class="border px-4 py-2">{dash?.name}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2 font-semibold">Email</td>
            <td class="border px-4 py-2">{dash?.email}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2 font-semibold">ID</td>
            <td class="border px-4 py-2">{dash?._id}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2 font-semibold">Phone</td>
            <td class="border px-4 py-2">{dash?.phone}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Document</td>
            <td className="border px-4 py-2">
              {dash?.document && (
                <a
                  href={`data:application/pdf;base64,${dash.document.toString(
                    "base64"
                  )}`}
                  // download="document.pdf"
                >
                  Certificate
                </a>
              )}
            </td>
          </tr>
          {/* You might not want to display the password directly in the UI */}

          {/* <tr>
        <td class="border px-4 py-2 font-semibold">Password</td>
        <td class="border px-4 py-2">{dash?.password}</td>
      </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionistDetails;
