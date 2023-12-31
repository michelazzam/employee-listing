import React from "react";
import Select from "react-select";
import countries from "../constants/countryCode"; // make sure the path to countries.json is correct

interface CountrySelectProps {
  selectedCountry: string;
  onCountryChange: (countryName: string) => void;
}

const countryOptions = Object.keys(countries).map((countryCode) => ({
  label: countries?.[countryCode as keyof typeof countries]?.name,
}));

const CountrySelect: React.FC<CountrySelectProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  const handleCountryChange = (selectedOption: any) => {
    // any type is used here for simplicity, but you might want to create a proper type for the selectedOption
    onCountryChange(selectedOption ? selectedOption.label : "");
  };

  const selectedOption = selectedCountry
    ? countryOptions.find((option) => option.label === selectedCountry)
    : null;

  return (
    <Select
      value={selectedOption}
      onChange={handleCountryChange}
      options={countryOptions}
      placeholder="Select a country..."
    />
  );
};

export default CountrySelect;
