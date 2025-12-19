import { useEffect, useState } from "react";

const useDistrictUpazila = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);

  const extractData = (json, tableName) => {
    const table = json.find(
      (item) => item.type === "table" && item.name === tableName
    );
    return table ? table.data : [];
  };

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => setDistricts(extractData(json, "districts")));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => setUpazilas(extractData(json, "upazilas")));
  }, []);

  const filteredUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrict?.id)
  );

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setSelectedUpazila(null);
  };

  const handleSelectUpazila = (upazila) => {
    setSelectedUpazila(upazila);
  };

  return {
    districts,
    filteredUpazilas,
    selectedDistrict,
    selectedUpazila,
    setSelectedDistrict: handleSelectDistrict,
    setSelectedUpazila: handleSelectUpazila,
  };
};

export default useDistrictUpazila;
