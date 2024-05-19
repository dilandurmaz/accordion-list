import React, { useState, useEffect, useRef } from "react";
import "./AccordionListWithSearch.scss";
import axiosInstance from "../../utils/axiosInstance";
import { User } from "./AccordionList";
import { CiSaveUp2 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";
import {
  flattenObject,
  formatKeyForPlaceholder,
  getNestedValue,
} from "../../utils/commonFuntions";

const AccordionListWithSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterUser, setFilterUser] = useState<User[]>([]);
  const [filter, setFilter] = useState<any>({});
  const ref = useRef<{ getData: () => User[] } | null>(null);
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const userKeys =
    filterUser.length > 0 ? Object.keys(flattenObject(filterUser[0])) : [];

  // fetch all users
  useEffect(() => {
    const getAllUsers = () => {
      axiosInstance
        .get("users")
        .then((response) => {
          const sortedUsers = response.data.sort(
            (a: User, b: User) => a.id - b.id
          );
          setUsers(sortedUsers);
          setFilterUser(sortedUsers);
        })
        .catch((error) => Promise.reject(error));
    };
    getAllUsers();
  }, []);

  // Functions used for filtering
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filterUsers = (user: User) => {
    for (const key in filter) {
      if (Object.hasOwnProperty.call(filter, key)) {
        const filterValue = filter[key].toLowerCase();
        const userValue = String(getNestedValue(user, key)).toLowerCase();
        if (!userValue.includes(filterValue)) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    const filteredUsers = filterUser.filter(filterUsers);
    const sortedUsers = filteredUsers.sort((a: User, b: User) => a.id - b.id);
    setUsers(sortedUsers);
  }, [filter]);

  // When you click on the icon, detailed information opens.
  const toggleAccordion = (id: number) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  // Function that replaces the user above when the icon is clicked
  const handleSort = (clickedId: number) => {
    const clickedIndex = users.findIndex((user) => user.id === clickedId);
    if (clickedIndex > 0) {
      const updatedUsers = [...users];

      const temp = updatedUsers[clickedIndex - 1];

      updatedUsers[clickedIndex - 1] = updatedUsers[clickedIndex];
      updatedUsers[clickedIndex - 1].id = temp.id;

      updatedUsers[clickedIndex] = temp;
      updatedUsers[clickedIndex].id = clickedId;

      setUsers(updatedUsers);
    }
  };

  // Function that returns search fields
  const renderInputs = (keys: string[]) => {
    return keys.map((key) => (
      <div className="input-container">
        <input
          key={key}
          type={key === "id" ? "number" : "text"}
          placeholder={`${formatKeyForPlaceholder(key)}`}
          name={key}
          value={filter[key] || ""}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <IoIosSearch className="search-icon" />
      </div>
    ));
  };

  // Function to return users' detail information
  const getUserDetailInformation = (user: User) => {
    const { id, name, username, ...rest } = user;
    const detailElements = Object.entries(rest).map(([key, value]) => (
      <p key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
        {typeof value === "object" ? Object.values(value).join(", ") : value}
      </p>
    ));

    return detailElements;
  };

  return (
    <div className="accordion-list-with-search">
      <div className="accordion-search">
        <h3>Filter</h3>
        {renderInputs(userKeys)}
      </div>

      <div className="accordion-list">
        <div className="accordion">
          <div className="accordion-title">
            <h3>Id</h3> <h3>UserName</h3> <h3>Name</h3>
          </div>
          {users.length > 0 ? (
            <>
              {users.map((item: User) => (
                <div className="accordion" key={item.id}>
                  <div className="accordion-header">
                    <h3>{item.id}</h3>
                    <h3>{item.username}</h3>
                    <h3>{item.name}</h3>
                    <div className="accordion-header-right">
                      <CiSaveUp2
                        onClick={() => handleSort(item.id)}
                        style={{
                          width: "27px",
                          height: "27px",
                          marginRight: "20px",
                        }}
                      />
                      <MdChevronRight
                        onClick={() => toggleAccordion(item.id)}
                        className={`open-icon ${
                          openAccordionId === item.id ? "rotated" : ""
                        }`}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                  </div>
                  <div
                    className={`accordion-content ${
                      openAccordionId === item.id ? "open" : ""
                    }`}
                  >
                    {getUserDetailInformation(item)}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <span>User not found </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionListWithSearch;
