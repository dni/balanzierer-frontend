import { createSignal } from "solid-js";

export const [error_message, setErrorMessage] = createSignal("");
export const [success_message, setSuccessMessage] = createSignal("");

export const [balance, setBalance] = createSignal(0);

export const [showsettings, setShowsettings] = createSignal(false);
export const [services, setServices] = createSignal([]);

export const [channels, setChannels] = createSignal(false);
export const [peers, setPeers] = createSignal(false);
