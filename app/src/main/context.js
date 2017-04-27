require("electron-context-menu")({
  prepend: (params, browserWindow) => [{
    label: "Rainbow",
		// only show it when right-clicking images
    visible: params.mediaType === "image",
  }],
});
