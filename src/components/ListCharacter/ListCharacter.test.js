import { shallow } from "enzyme";
import React from "react";

import { ListCharacter } from "./ListCharacter";

describe("<ListCharacter />", () => {
  test("smoke test", () => {
    expect(ListCharacter).toBeDefined();
  });

  test("render widthout characters", () => {
    const props = { characters: [] };
    const wrapper = shallow(<ListCharacter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("render width characters", () => {
    const character = { id: "1" };
    const props = { characters: [character] };
    const wrapper = shallow(<ListCharacter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
