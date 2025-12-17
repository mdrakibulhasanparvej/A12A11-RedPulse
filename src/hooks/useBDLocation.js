import { useEffect, useState } from "react";

const useBDLocation = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);
  const [selectedUnion, setSelectedUnion] = useState(null);

  const extractData = (json, tableName) => {
    const table = json.find(
      (item) => item.type === "table" && item.name === tableName
    );
    return table ? table.data : [];
  };

  useEffect(() => {
    fetch("/divisions.json")
      .then((res) => res.json())
      .then((json) => setDivisions(extractData(json, "divisions")));

    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => setDistricts(extractData(json, "districts")));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => setUpazilas(extractData(json, "upazilas")));

    fetch("/unions.json")
      .then((res) => res.json())
      .then((json) => setUnions(extractData(json, "unions")));
  }, []);

  const filteredDistricts = districts.filter(
    (d) => String(d.division_id) === String(selectedDivision?.id)
  );

  const filteredUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrict?.id)
  );

  const filteredUnions = unions.filter(
    (u) => String(u.upazilla_id) === String(selectedUpazila?.id)
  );

  // Reset dependent selections
  const handleSelectDivision = (division) => {
    setSelectedDivision(division);
    setSelectedDistrict(null);
    setSelectedUpazila(null);
    setSelectedUnion(null);
  };

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setSelectedUpazila(null);
    setSelectedUnion(null);
  };

  const handleSelectUpazila = (upazila) => {
    setSelectedUpazila(upazila);
    setSelectedUnion(null);
  };

  const handleSelectUnion = (union) => setSelectedUnion(union);

  return {
    divisions,
    filteredDistricts,
    filteredUpazilas,
    filteredUnions,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    selectedUnion,
    setSelectedDivision: handleSelectDivision,
    setSelectedDistrict: handleSelectDistrict,
    setSelectedUpazila: handleSelectUpazila,
    setSelectedUnion: handleSelectUnion,
  };
};

export default useBDLocation;
