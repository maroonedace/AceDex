const KG_TO_LBS = 2.20462262185;

const METER_TO_FEET = 3.28084;

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const convertKgToLbs = (kg: number): number => {
  const weightInLbs = kg * KG_TO_LBS;
  return weightInLbs;
};

export const convertMeterToFeetAndInches = (meter: number) => {
  const heightInFeet = meter * METER_TO_FEET;

  let feet = Math.floor(heightInFeet);

  let inches = Math.round((heightInFeet - feet) * 12);

  if (inches === 12) {
    feet += 1;
    inches = 0;
  }

  return {
    feet,
    inches,
  };
};
