import React, { forwardRef } from "react";
import { Container, Row, Col } from "reactstrap";
import MaterialTable from "material-table";
import {
  Search,
  ArrowDownward,
  FirstPage,
  LastPage,
  Clear,
  SaveAlt,
  ChevronLeft,
  ChevronRight,
  FilterList,
} from "@material-ui/icons";
import Ratings from "../Ratings";

const tableicons = {
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
};

const Schools = () => {
  return (
    <Container>
      <Row className="py-5">
        <Col xs={12}>
          <MaterialTable
            style={{ minHeight: "200px" }}
            title="School's List"
            icons={tableicons}
            columns={[
              {
                title: "Image",
                field: "imgUrl",
                filtering: false,
                sorting: false,
                export: false,
                render: (rowData) => (
                  <img src={rowData.imgUrl} style={{ width: 80 }} alt="..." />
                ),
              },
              { title: "Name", field: "name", filtering: false },
              { title: "State", field: "state" },
              { title: "City", field: "city" },
              { title: "Board", field: "board" },
              { title: "Ratings", field: "rating" },
            ]}
            data={[
              {
                name: "Delhi Public School",
                state: "Uttar Pradesh",
                city: "Meerut",
                board: "CBSE",
                rating: <Ratings />,
                imgUrl:
                  "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
              },
              {
                name: "SP Public School",
                state: "J&K",
                city: "Jammu",
                board: "ICSE",
                rating: <Ratings />,
                imgUrl:
                  "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
              },
              {
                name: "St. Mary's School",
                state: "Uttar Pradesh",
                city: "Bijnor",
                board: "ICSE",
                rating: <Ratings />,
                imgUrl:
                  "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
              },
              {
                name: "Jaypee School",
                state: "Uttar Pradesh",
                city: "Noida",
                board: "CBSE",
                rating: <Ratings />,
                imgUrl:
                  "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
              },
              {
                name: "Doon Public School",
                state: "Uttarakhand",
                city: "Dehradun",
                board: "CBSE",
                rating: <Ratings />,
                imgUrl:
                  "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
              },
              {
                name: "Delhi Public School",
                state: "Uttar Pradesh",
                city: "Meerut",
                board: "CBSE",
                rating: <Ratings />,
                imgUrl:
                  "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
              },
              {
                name: "Delhi Public School",
                state: "Uttar Pradesh",
                city: "Meerut",
                board: "CBSE",
                rating: <Ratings />,
                imgUrl:
                  "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
              },
            ]}
            options={{
              filtering: true,
              exportButton: true,
              sorting: true,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Schools;
