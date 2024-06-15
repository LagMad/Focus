import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Note from "../components/shared/Note";

const Notes = () => {
  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen justify-start items-center gap-5 px-5 pb-16 bg-HomeBG bg-cover bg-no-repeat">
        <div className="flex flex-row w-full h-auto justify-between items-center bg-cust-pink-lighter rounded-2xl py-7 px-16 bg-opacity-30 backdrop-blur-xl drop-shadow-2xl border-[1px] border-cust-white">
          <div className="flex flex-col w-1/4 justify-center items-start font-bold text-3xl">
            Take Notes
          </div>
        </div>
        <div className="flex flex-col w-full h-auto justify-start items-center gap-5">
          <div className="flex w-full pl-16 text-cust-grey">Pinned</div>
          <div className="grid grid-cols-4 w-full h-auto justify-start items-center gap-5">
            <Note
              title={"Praktikum"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
              }
            />
            <Note
              title={"Praktikum"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-auto justify-start items-center gap-5">
          <div className="flex w-full pl-16 text-cust-grey">Others</div>
          <div className="grid grid-cols-4 w-full h-auto justify-start items-center gap-5">
            <Note
              title={"Praktikum"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
              }
            />
            <Note
              title={"Praktikum"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
              }
            />
            <Note
              title={"Praktikum"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
              }
            />
            <Note
              title={"Praktikum"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae scelerisque velit. Nam fringilla, odio ut placerat ornare, nulla dolor ornare ex, eu cursus dolor metus non mauris. Quisque mollis orci ullamcorper arcu mollis, ut vehicula quam semper. Nunc commodo sed ante nec euismod. Praesent ornare massa non nisi varius, finibus sollicitudin ex hendrerit."
              }
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Notes;
