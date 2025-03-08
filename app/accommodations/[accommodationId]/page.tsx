"use client";
import * as Icons from "lucide-react";
import topCriteriaData from "@/src/data/topCriteria.json";
import { fetchAccommodationById } from "@/src/lib/accommodation-api";
import AccommodationDetailImage from "@/src/components/accommodations/accommodationDetailImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { DatePicker } from "@/src/components/datePicker";
import { useState, useEffect } from "react";
import {
  createTransaction,
  countTransactionByAccommodationId,
  checkUserTransaction,
} from "@/src/lib/transaction-api";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DetailAccommodation(props: {
  params: {
    accommodationId: string;
  };
}) {
  const router = useRouter();
  const params = useParams();

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  function getIconComponent(iconName: string) {
    return Icons[iconName as keyof typeof Icons] as React.ElementType;
  }

  const [accommodationId, setAccommodationId] = useState<string | null>(null);
  const [accommodation, setAccommodation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalDays, setTotalDays] = useState(7);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (params.accommodationId) {
      const id = Array.isArray(params.accommodationId)
        ? params.accommodationId[0]
        : params.accommodationId;
      setAccommodationId(id);
    }
  }, [params]);

  useEffect(() => {
    if (!accommodationId) return;

    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchAccommodationById(accommodationId);
        setAccommodation(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'hébergement :",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [accommodationId]);

  useEffect(() => {
    if (accommodation) {
      setTotalPrice(totalDays * (accommodation.price || 0));
    }
  }, [totalDays, accommodation]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const reservationData = {
        accommodationId: accommodationId,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      };

      const check = await checkUserTransaction(token, reservationData);

      if (!check) {
        console.log("envoi de la réservation");
        const countTransaction = await countTransactionByAccommodationId(
          reservationData
        );
        console.log("test1");
        if (countTransaction.transactionCount != accommodation.totalPlaces) {
          const formData = new FormData();
          formData.append("accommodationId", accommodationId);
          formData.append("totalPrice", totalPrice.toString());
          if (startDate && endDate) {
            formData.append("startDate", startDate.toISOString());
            formData.append("endDate", endDate.toISOString());
          } else {
            alert("Veuillez sélectionner une date");
            return;
          }
          formData.append("userId", "deded");

          console.log("test2");
          console.log("accommodationId:", formData.get("accommodationId"));
          console.log("totalPrice:", formData.get("totalPrice"));
          console.log("startDate:", formData.get("startDate"));
          console.log("endDate:", formData.get("endDate"));

          await createTransaction(token, formData);

          router.push("/account/history");
        } else {
          alert("Aucune réservation disponible pour cet hébergement !");
          return;
        }
      } else {
        alert("Vous avez déjà réservé cet hébergement pour ces dates");
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error("Erreur:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (loading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row  justify-between  ">
        <div className="">
          <h1 className="text-3xl font-bold mb-2">{accommodation.name}</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <Icons.MapPin className="h-4 w-4 opacity-70 mr-1" />
            {accommodation.localisation}
          </div>
          <div className="flex items-center text-gray-950 mb-6">
            <Icons.CircleUserRound className="h-4 w-4 opacity-70 mr-1" /> Ces
            personnes ont réservés : John Doe, John Doe
          </div>
        </div>
        <div className="end-0 flex flex-col items-end">
          <br />
          <div className="text-orange-500 mb-2">
            <span className="text-2xl font-bold">{accommodation.price}€</span>
            <span> /nuit</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-brown btn btn-md w-32 hover:bg-orange-300"
                variant="outline"
              >
                Réserver
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Valider vos dates</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <DatePicker
                    onDateChange={setTotalDays}
                    startDate={setStartDate}
                    endDate={setEndDate}
                  />
                </div>
                <div>Total : {totalPrice} €</div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-green-600 btn btn-md w-32 hover:bg-green-500"
                  onClick={handleSubmit}
                >
                  Valider
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <AccommodationDetailImage accommodation={accommodation} />

      <hr className="my-6" />
      <h2 className="text-xl font-bold mb-4">Détails</h2>
      <div className="mb-8">{accommodation.description}</div>
      <h2 className="text-xl font-bold mb-4">Top critères</h2>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {accommodation.topCriteria.map((criteria: string) => {
          type CriteriaKeys = keyof typeof topCriteriaData;

          const icon = topCriteriaData[criteria as CriteriaKeys].icon;
          const IconComponent = getIconComponent(icon);

          return (
            <div className="flex items-center gap-2 mb-2" key={criteria}>
              {IconComponent && (
                <IconComponent className="h-5 w-5 opacity-70 mr-1" />
              )}{" "}
              {topCriteriaData[criteria as CriteriaKeys].label}
            </div>
          );
        })}
      </div>
      <h2 className="text-xl font-bold mb-4">Description intérieure</h2>
      <div className="grid grid-cols-3 gap-2 mb-8">
        <div className="flex items-center gap-2 mb-2">
          {accommodation.squareMeter} m²
        </div>
        <div className="flex items-center gap-2 mb-2">
          {accommodation.numberRoom} pièces
        </div>
        <div className="flex items-center gap-2 mb-2">
          {accommodation.bedRoom} chambre(s)
        </div>
      </div>
    </div>
  );
}
