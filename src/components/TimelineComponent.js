import React, { useState, useEffect } from "react";
import { Card, CardHeader, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import { Ling } from "./Ling";
import { Authentication } from "./SignUp";

import { NewLingComponent } from "./NewLingComponent";
import { LANGUAGEFILTERS } from "../data/LANGUAGEFILTERS";
export const TimelineComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const lings = useSelector((state) => state.posts.reverse());
  const [filterLang, setFilterLang] = useState("Show All");

  return (
    <>
      <Card className="mb-3">
        <CardHeader className="text-right">
          Filter by language 👇
          <Input
            type="select"
            style={{ width: "30%" }}
            className="ml-auto mb-2 mt-1"
            placeholder="Filter Lings by language..."
            onChange={(e) => setFilterLang(e.target.value)}
          >
            {LANGUAGEFILTERS.map((language) => (
              <option>{language}</option>
            ))}
          </Input>
        </CardHeader>
      </Card>

      <Ling lings={lings} lang={filterLang} />
    </>
  );
};
