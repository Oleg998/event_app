import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filter/filter-selectors";

export const selectAllEvents = store => store.event.items;

export const selectorRequestStutus=state=>state.event.isLoading


export const selectEvent = state =>state.event

export const selectFilteEvent = createSelector([selectAllEvents , selectFilter],(event , filter) => {
  if (!filter) {
    return event;
  }
  const normalizedFilter = filter.toLocaleLowerCase();
  return event.filter(({ name }) =>
  name.toLocaleLowerCase().includes(normalizedFilter))
})
