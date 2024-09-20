import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filter/filter-selectors";

export const selectAllEvents = store => store.events.items;

export const selectorRequestStutus=state=>state.events.requestStutus


export const selectContact = state =>state.events

export const selectFilterContact = createSelector([selectAllEvents , selectFilter],(events , filter) => {
  if (!filter) {
    return events;
  }
  const normalizedFilter = filter.toLocaleLowerCase();
  return events.filter(({ name }) =>
  name.toLocaleLowerCase().includes(normalizedFilter))
})
