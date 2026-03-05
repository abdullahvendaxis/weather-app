function RamzanTiming({ astro }) {
  if (!astro) return null;

  return (
    <div className="rounded-2xl p-6 border mb-8">
      <h3 className="text-xl font-semibold mb-4">
        Ramzan Timing
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="p-4 rounded-xl border text-center">
          <p className="font-semibold">
            Sehri Ends
          </p>
          <p className="text-lg font-bold">
            {astro.sunrise}
          </p>
        </div>

        <div className="p-4 rounded-xl border text-center">
          <p className="font-semibold">
            Iftar Time
          </p>
          <p className="text-lg font-bold">
            {astro.sunset}
          </p>
        </div>

      </div>
    </div>
  );
}

export default RamzanTiming;
