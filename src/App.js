import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function Dropdown() {
  const [provinsi, setProvinsi] = useState([]);
  const [provinsiid, setProvinsiid] = useState("");
  const [st, setSt] = useState([]);
  const [kabupatenkotaid, setKabupatenkotaid] = useState("");
  const [kecamatan, setKecamatan] = useState([]);

  useEffect(() => {
    const getprovinsi = async () => {
      const resprovinsi = await fetch(
        "http://dev.farizdotid.com/api/daerahindonesia/provinsi"
      );
      const rescon = await resprovinsi.json();
      setProvinsi(await rescon);
    };
    getprovinsi();
  }, []);

  const handleprovinsi = (event) => {
    const getprovinsiid = event.target.value;
    setProvinsiid(getprovinsiid);
  };

  useEffect(() => {
    const getkabupatenkota = async () => {
      const reskabupatenkota = await fetch(
        `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi={id_provinsi}`
      );
      const resst = await reskabupatenkota.json();
      setSt(await resst);
    };
    getkabupatenkota();
  }, [provinsiid]);

  const handlekabupatenkota = (event) => {
    const getkabupatenkotaid = event.target.value;
    setKabupatenkotaid(getkabupatenkotaid);
  };

  useEffect(() => {
    const getkecamatan = async () => {
      const reskecamatan = await fetch(
        `http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota={id_kota}`
      );
      const rkecamatan = await reskecamatan.json();
      setKecamatan(await rkecamatan);
    };
    getkecamatan();
  }, [kabupatenkotaid]);

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-4 mb-4 fw-bold">
              Select Provinsi, Kabupaten/Kota and Kecamatan ReactJs{" "}
            </h2>

            <form className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Provinsi </label>
                <select
                  name="provinsi"
                  className="form-control p-2"
                  onChange={(e) => handleprovinsi(e)}
                >
                  <option value="">--Select Provinsi--</option>
                  {provinsi.map((getcon, index) => (
                    <option key={index} value={getcon.provinsi_id}>
                      {getcon.provinsi_name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Kabupaten/Kota</label>
                <select
                  className="form-select"
                  name="kabupatenkota"
                  onChange={(e) => handlekabupatenkota(e)}
                >
                  <option value="">--Select Kabupaten/Kota--</option>
                  {st.map((getst, index) => (
                    <option key={index} value={getst.kabupatenkota_id}>
                      {getst.kabupatenkota_name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Kecamatan</label>
                <select className="form-select" name="kecamatan">
                  <option value="">--Select Kecamatan--</option>
                  {kecamatan.map((gkecamatan, index) => (
                    <option key={index} value={gkecamatan.kecamatan_id}>
                      {" "}
                      {gkecamatan.kecamatan_name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <button type="button" className="btn btn-primary mt-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Dropdown;
