const { format_date, format_plural } = require("../utils/helpers");

test("check to see format_date returns a date string", () => {
    const date = new Date("2020-03-20 15:12:03");

    expect(format_date(date)).toBe("3/20/2020");
});

test("check to see format_plural correctly pluralizes", () => {
    const plural = format_plural("bear", 2);
    const singular = format_plural("owl", 1);

    expect(plural).toBe("bears");
    expect(singular).toBe("owl");
});