import "./App.css";
import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  Box,
  Image,
  TextInput,
  Flex,
  Select,
  Pagination,
} from "@mantine/core";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();
  const [sort, setSort] = useState(null);

  const getDataList = async () => {
    await fetch("https://restcountries.com/v3.1/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((r) => setData(r));
  };

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    if (search) {
      const val = data.filter((f) => f.name.official === search);
      setData(val);
    }
    if (search === "") {
      getDataList();
    }
  }, [search]);

  useEffect(() => {
    if (sort) {
      const val = data.sort((a, b) => {
        if (sort === "descending") {
          return a.name.official.localeCompare(b.name.official);
        } else {
          return b.name.official.localeCompare(a.name.official);
        }
      });
    }
  }, [sort]);

  console.log("s", sort);

  const rows = data.map((e, id) => (
    <tr key={e.name.official}>
      <td>{id + 1}</td>
      <td>
        <Image width={40} height={30} src={e.flags.png} />
      </td>
      <td>{e.name.official}</td>
      <td>{e.cca2}</td>
      <td>{e.cca3}</td>
      <td>{e.name.nativeName?.fra?.official || "N/A"}</td>
      <td>
        {e.altSpellings.map((x) => (
          <div>{x}</div>
        ))}
      </td>
      <td>{e.idd.root}</td>
    </tr>
  ));

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#E5E4E2" }}>
      <Box py={30}>
        <Paper mx="auto" shadow="xs" p="xl" w={1200}>
          <Flex my={25} gap="md">
            <TextInput
              onChange={(s) => setSearch(s.target.value)}
              label="Country Name"
              placeholder="Country Name"
              inputWrapperOrder={["label", "error", "input", "description"]}
            />
            <Select
              label="Country Name(Sort)"
              placeholder="--Select--"
              onChange={(e) => setSort(e)}
              data={["ascending", "descending"]}
            />
          </Flex>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Flags</th>
                <th>Country Name</th>
                <th style={{ whiteSpace: "nowrap" }}>2Char Country Code</th>
                <th style={{ whiteSpace: "nowrap" }}>3Char Country Code</th>
                <th style={{ whiteSpace: "nowrap" }}>Native Country Name</th>
                <th style={{ whiteSpace: "nowrap" }}>
                  Alternative Country Name
                </th>
                <th style={{ whiteSpace: "nowrap" }}>Country Calling Codes</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Pagination
            total={data.length}
            siblings={0}
            boundaries={1}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default App;
