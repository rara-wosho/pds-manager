import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

export default function DatasheetForm() {
  const [readOnly, setReadOnly] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "John",
    last_name: "Doe",
    middle_name: "Smith",
    suffix: "Jr.",
    gender: "Male",
    email: "john.doe@example.com",
    contact_number: "123-456-7890",
    nationality: "American",
    religion: "Christian",
    birthday: "1990-01-01",
    birthplace: "New York",
    course: "Computer Science",
    year_section: "2022-2023",
    highschool: "ABC High School",
    year_graduated: "2016",
    house_number: "123 Main St",
    barangay: "Downtown",
  });

  return (
    <>
      <div
        style={{ gap: 8 }}
        className="d-flex align-items-center justify-content-center datasheet-form w-100 py-4"
      >
        <button
          onClick={() => setReadOnly(!readOnly)}
          className="btn btn-success px-2 px-md-4"
        >
          {readOnly ? "Edit Informations" : "Save Changes"}
        </button>
        <button className="btn btn-outline-danger px-2 px-md-4">
          Delete Account
        </button>
        <button className="btn btn-outline-secondary">
          <MdOutlineContentCopy size={18} />
        </button>
      </div>

      <div className="d-flex flex-column w-100 datasheet-form pt-4 px-3 px-md-0">
        {readOnly && <div className="w-100 h-100 position-absolute"></div>}

        <div className="w-100 datasheet-header mb-2 fw-semibold text-muted text-center py-2 rounded-2">
          <h6 className="text-muted fw-semibold mb-0">Personal Information</h6>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-4">
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">First Name</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Last Name</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Middle Name</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">
              Suffix/Name Extention (Optional)
            </label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Nickname</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Phone Number</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Email Address</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Age</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Gender</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Civil Status</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Religion</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Birthday</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Birthplace</label>
            <input type="text" className="form-control border bg-none" />
          </div>
        </div>

        {/* ACADEMIC SECTION  */}
        <div className="w-100 datasheet-header mb-2 fw-semibold text-muted text-center py-2 rounded-2">
          <h6 className="text-muted fw-semibold mb-0">Academic</h6>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-4">
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Course</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Year and Section</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Name of Highschool</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Year Graduated</label>
            <input type="text" className="form-control border bg-none" />
          </div>
        </div>

        {/* Address SECTION  */}
        <div className="w-100 datasheet-header mb-2 fw-semibold text-muted text-center py-2 rounded-2">
          <h6 className="text-muted fw-semibold mb-0">Address</h6>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-4">
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">House#, Street Name</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Barangay</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Municipality</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Zip Code</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Province</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Region</label>
            <input type="text" className="form-control border bg-none" />
          </div>
        </div>
        {/* Parents SECTION  */}
        <div className="w-100 datasheet-header mb-2 fw-semibold text-muted text-center py-2 rounded-2">
          <h6 className="text-muted fw-semibold mb-0">
            Parents/Legal Guardian
          </h6>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-4">
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Father's Full Name</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Occupation</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Contact Number</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">
              Indicate if deceased, OFW/working abroad, or outside the province
              (Optional)
            </label>
            <input type="text" className="form-control border bg-none" />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-4">
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Mother's Full Name</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Occupation</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Contact Number</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">
              Indicate if deceased, OFW/working abroad, or outside the province
              (Optional)
            </label>
            <input type="text" className="form-control border bg-none" />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-4">
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Guardian's Full Name</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Occupation</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">Contact Number</label>
            <input type="text" className="form-control border bg-none" />
          </div>
          <div className="col mb-3 px-1">
            <label className="form-label mb-1">
              Indicate if deceased, OFW/working abroad, or outside the province
              (Optional)
            </label>
            <input type="text" className="form-control border bg-none" />
          </div>
        </div>
      </div>
    </>
  );
}
