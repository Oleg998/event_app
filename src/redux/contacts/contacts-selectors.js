import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filter/filter-selectors";

export const selectAllContact = store => store.contacts.items;

export const selectorRequestStutus=state=>state.contacts.requestStutus


export const selectContact = state =>state.contacts

export const selectFilterContact = createSelector([selectAllContact , selectFilter],(contacts , filter) => {
  if (!filter) {
    return contacts;
  }
  const normalizedFilter = filter.toLocaleLowerCase();
  return contacts.filter(({ name }) =>
  name.toLocaleLowerCase().includes(normalizedFilter))
})
