"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  console.log("Session utilisateur :", session); 
  return (
    // <div className="flex items-center justify-center min-h-screen bg-white">
    //   <div className="bg-slate-50 p-8 rounded-lg shadow-md w-full max-w-md">
    //     <div className="text-center mb-6">
    //       <h1 className="text-2xl font-bold">Connexion</h1>
    //       <p className="text-gray-500">Connectez-vous à votre compte</p>
    //     </div>
    //     <form>
    //       <div className="mb-4">
    //         <label
    //           className="block text-sm font-medium text-gray-700"
    //           htmlFor="email"
    //         >
    //           Email
    //         </label>
    //         <input
    //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //           id="email"
    //           name="email"
    //           type="email"
    //           placeholder="eg. example@email.com"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label
    //           className="block text-sm font-medium text-gray-700"
    //           htmlFor="password"
    //         >
    //           Mot de passe
    //         </label>
    //         <input
    //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //           id="password"
    //           name="password"
    //           type="password"
    //           placeholder="********"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <div className="text-sm text-right">
    //           <a
    //             className="font-medium text-blue-600 hover:text-blue-500"
    //             href="#"
    //           >
    //             Mot de passe oublié ?
    //           </a>
    //         </div>
    //         <button
    //           className="w-full flex justify-center py-2 px-4 mt-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    //           type="submit"
    //         >
    //           Connexion
    //         </button>
    //         <div className="mt-4 text-center">
    //           <p className="text-sm text-gray-500">
    //             Vous n'avez pas de compte ?
    //           </p>
    //           <a
    //             className="text-sm font-medium text-blue-600 hover:text-blue-500"
    //             href="/register"
    //           >
    //             Inscrivez-vous
    //           </a>
    //         </div>
    //       </div>
    //       <div className="mb-4">
    //         <p className="text-sm text-gray-500 text-center my-4">ou</p>
    //         <button
    //           className="w-full flex justify-center py-2 px-4 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    //           type="button"
    //         >
    //           Connexion avec Google
    //         </button>
    //         <button
    //           className="w-full flex justify-center py-2 px-4 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
    //           type="button"
    //         >
    //           Connexion avec Microsoft
    //         </button>
    //         <button
    //           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
    //           type="button"
    //         >
    //           Connexion avec Apple
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {session?.user?.name ? `Bienvenue, ${session.user.name}` : "Veuillez vous connecter"}
      </h1>
      {session ? (
        <>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => signOut()}
          >
            Se déconnecter
          </button>
        </>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => signIn("fusionauth")}
        >
          Se connecter avec FusionAuth
        </button>
      )}
    </div>
  );
}
