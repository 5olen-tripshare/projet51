import { Card } from "@/src/components/ui/card";

export default function Payment() {
  return (
    <div className="mx-20">
      <h1 className="py-3 text-2xl font-bold">Moyen de paiement</h1>
      <Card className="w-1/3 p-5">
        <form className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-sm font-light">
              Nom sur la carte :
            </label>
            <input
              type="text"
              name="cardName"
              placeholder="John Doe"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-light">
              Numéro de carte :
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-light">
              Date d'expiration :
            </label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-light">
              CVV :
            </label>
            <input
              type="password"
              name="cvv"
              placeholder="123"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enregistrer
          </button>
        </form>
      </Card>
    </div>
  );
}
