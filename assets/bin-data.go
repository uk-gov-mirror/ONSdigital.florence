// Code generated by go-bindata.
// sources:
// ../src/.DS_Store
// ../src/app/App.jsx
// ../src/app/collections/Collections.jsx
// ../src/app/config/routes.js
// ../src/app/config/store.js
// ../src/app/login/Login.jsx
// ../src/dist/css/main.css
// ../src/dist/florence.bundle.js
// ../src/dist/img/sprite.png
// ../src/dist/js/florence.bundle.js
// ../src/dist/manifest.json
// ../src/dist/service-worker.js
// ../src/img/sprite.png
// ../src/index.html
// ../src/index.js
// ../src/manifest.json
// ../src/package.json
// ../src/scss/components/_accordion.scss
// ../src/scss/components/_builder.scss
// ../src/scss/components/_icons.scss
// ../src/scss/components/_markdown-editor.scss
// ../src/scss/components/_network-status.scss
// ../src/scss/components/_page.scss
// ../src/scss/components/_slider.scss
// ../src/scss/elements/_buttons.scss
// ../src/scss/elements/_forms.scss
// ../src/scss/elements/_inputs.scss
// ../src/scss/elements/_nav.scss
// ../src/scss/elements/_tables.scss
// ../src/scss/elements/_typography.scss
// ../src/scss/main.scss
// ../src/scss/partials/_base.scss
// ../src/scss/partials/_collections.scss
// ../src/scss/partials/_colour-palette.scss
// ../src/scss/partials/_elements.scss
// ../src/scss/partials/_fonts.scss
// ../src/scss/partials/_jqui.scss
// ../src/scss/partials/_publish.scss
// ../src/scss/partials/_reset.scss
// ../src/scss/partials/_shame.scss
// ../src/scss/partials/_utilities.scss
// ../src/scss/partials/_workspace.scss
// ../src/scss/utilities/_display.scss
// ../src/scss/utilities/_grid.scss
// ../src/scss/utilities/_margin.scss
// ../src/scss/utilities/_mixins.scss
// ../src/scss/utilities/_padding.scss
// ../src/scss/utilities/_panels.scss
// ../src/scss/utilities/_utilities.scss
// ../src/service-worker.js
// ../src/webpack.config.js
// DO NOT EDIT!

package assets

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

// bindataRead reads the given file from disk. It returns an error on failure.
func bindataRead(path, name string) ([]byte, error) {
	buf, err := ioutil.ReadFile(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset %s at %s: %v", name, path, err)
	}
	return buf, err
}

type asset struct {
	bytes []byte
	info  os.FileInfo
}

// SrcDs_store reads file data from disk. It returns an error on failure.
func SrcDs_store() (*asset, error) {
	path := "/Users/jon/web/florence/src/.DS_Store"
	name := "../src/.DS_Store"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcAppAppJsx reads file data from disk. It returns an error on failure.
func SrcAppAppJsx() (*asset, error) {
	path := "/Users/jon/web/florence/src/app/App.jsx"
	name := "../src/app/App.jsx"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcAppCollectionsCollectionsJsx reads file data from disk. It returns an error on failure.
func SrcAppCollectionsCollectionsJsx() (*asset, error) {
	path := "/Users/jon/web/florence/src/app/collections/Collections.jsx"
	name := "../src/app/collections/Collections.jsx"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcAppConfigRoutesJs reads file data from disk. It returns an error on failure.
func SrcAppConfigRoutesJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/app/config/routes.js"
	name := "../src/app/config/routes.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcAppConfigStoreJs reads file data from disk. It returns an error on failure.
func SrcAppConfigStoreJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/app/config/store.js"
	name := "../src/app/config/store.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcAppLoginLoginJsx reads file data from disk. It returns an error on failure.
func SrcAppLoginLoginJsx() (*asset, error) {
	path := "/Users/jon/web/florence/src/app/login/Login.jsx"
	name := "../src/app/login/Login.jsx"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcDistCssMainCss reads file data from disk. It returns an error on failure.
func SrcDistCssMainCss() (*asset, error) {
	path := "/Users/jon/web/florence/src/dist/css/main.css"
	name := "../src/dist/css/main.css"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcDistFlorenceBundleJs reads file data from disk. It returns an error on failure.
func SrcDistFlorenceBundleJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/dist/florence.bundle.js"
	name := "../src/dist/florence.bundle.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcDistImgSpritePng reads file data from disk. It returns an error on failure.
func SrcDistImgSpritePng() (*asset, error) {
	path := "/Users/jon/web/florence/src/dist/img/sprite.png"
	name := "../src/dist/img/sprite.png"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcDistJsFlorenceBundleJs reads file data from disk. It returns an error on failure.
func SrcDistJsFlorenceBundleJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/dist/js/florence.bundle.js"
	name := "../src/dist/js/florence.bundle.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcDistManifestJson reads file data from disk. It returns an error on failure.
func SrcDistManifestJson() (*asset, error) {
	path := "/Users/jon/web/florence/src/dist/manifest.json"
	name := "../src/dist/manifest.json"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcDistServiceWorkerJs reads file data from disk. It returns an error on failure.
func SrcDistServiceWorkerJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/dist/service-worker.js"
	name := "../src/dist/service-worker.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcImgSpritePng reads file data from disk. It returns an error on failure.
func SrcImgSpritePng() (*asset, error) {
	path := "/Users/jon/web/florence/src/img/sprite.png"
	name := "../src/img/sprite.png"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcIndexHtml reads file data from disk. It returns an error on failure.
func SrcIndexHtml() (*asset, error) {
	path := "/Users/jon/web/florence/src/index.html"
	name := "../src/index.html"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcIndexJs reads file data from disk. It returns an error on failure.
func SrcIndexJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/index.js"
	name := "../src/index.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcManifestJson reads file data from disk. It returns an error on failure.
func SrcManifestJson() (*asset, error) {
	path := "/Users/jon/web/florence/src/manifest.json"
	name := "../src/manifest.json"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcPackageJson reads file data from disk. It returns an error on failure.
func SrcPackageJson() (*asset, error) {
	path := "/Users/jon/web/florence/src/package.json"
	name := "../src/package.json"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssComponents_accordionScss reads file data from disk. It returns an error on failure.
func SrcScssComponents_accordionScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/components/_accordion.scss"
	name := "../src/scss/components/_accordion.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssComponents_builderScss reads file data from disk. It returns an error on failure.
func SrcScssComponents_builderScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/components/_builder.scss"
	name := "../src/scss/components/_builder.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssComponents_iconsScss reads file data from disk. It returns an error on failure.
func SrcScssComponents_iconsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/components/_icons.scss"
	name := "../src/scss/components/_icons.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssComponents_markdownEditorScss reads file data from disk. It returns an error on failure.
func SrcScssComponents_markdownEditorScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/components/_markdown-editor.scss"
	name := "../src/scss/components/_markdown-editor.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssComponents_networkStatusScss reads file data from disk. It returns an error on failure.
func SrcScssComponents_networkStatusScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/components/_network-status.scss"
	name := "../src/scss/components/_network-status.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssComponents_pageScss reads file data from disk. It returns an error on failure.
func SrcScssComponents_pageScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/components/_page.scss"
	name := "../src/scss/components/_page.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssComponents_sliderScss reads file data from disk. It returns an error on failure.
func SrcScssComponents_sliderScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/components/_slider.scss"
	name := "../src/scss/components/_slider.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssElements_buttonsScss reads file data from disk. It returns an error on failure.
func SrcScssElements_buttonsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/elements/_buttons.scss"
	name := "../src/scss/elements/_buttons.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssElements_formsScss reads file data from disk. It returns an error on failure.
func SrcScssElements_formsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/elements/_forms.scss"
	name := "../src/scss/elements/_forms.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssElements_inputsScss reads file data from disk. It returns an error on failure.
func SrcScssElements_inputsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/elements/_inputs.scss"
	name := "../src/scss/elements/_inputs.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssElements_navScss reads file data from disk. It returns an error on failure.
func SrcScssElements_navScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/elements/_nav.scss"
	name := "../src/scss/elements/_nav.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssElements_tablesScss reads file data from disk. It returns an error on failure.
func SrcScssElements_tablesScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/elements/_tables.scss"
	name := "../src/scss/elements/_tables.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssElements_typographyScss reads file data from disk. It returns an error on failure.
func SrcScssElements_typographyScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/elements/_typography.scss"
	name := "../src/scss/elements/_typography.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssMainScss reads file data from disk. It returns an error on failure.
func SrcScssMainScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/main.scss"
	name := "../src/scss/main.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_baseScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_baseScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_base.scss"
	name := "../src/scss/partials/_base.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_collectionsScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_collectionsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_collections.scss"
	name := "../src/scss/partials/_collections.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_colourPaletteScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_colourPaletteScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_colour-palette.scss"
	name := "../src/scss/partials/_colour-palette.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_elementsScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_elementsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_elements.scss"
	name := "../src/scss/partials/_elements.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_fontsScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_fontsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_fonts.scss"
	name := "../src/scss/partials/_fonts.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_jquiScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_jquiScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_jqui.scss"
	name := "../src/scss/partials/_jqui.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_publishScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_publishScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_publish.scss"
	name := "../src/scss/partials/_publish.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_resetScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_resetScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_reset.scss"
	name := "../src/scss/partials/_reset.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_shameScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_shameScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_shame.scss"
	name := "../src/scss/partials/_shame.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_utilitiesScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_utilitiesScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_utilities.scss"
	name := "../src/scss/partials/_utilities.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssPartials_workspaceScss reads file data from disk. It returns an error on failure.
func SrcScssPartials_workspaceScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/partials/_workspace.scss"
	name := "../src/scss/partials/_workspace.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssUtilities_displayScss reads file data from disk. It returns an error on failure.
func SrcScssUtilities_displayScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/utilities/_display.scss"
	name := "../src/scss/utilities/_display.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssUtilities_gridScss reads file data from disk. It returns an error on failure.
func SrcScssUtilities_gridScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/utilities/_grid.scss"
	name := "../src/scss/utilities/_grid.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssUtilities_marginScss reads file data from disk. It returns an error on failure.
func SrcScssUtilities_marginScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/utilities/_margin.scss"
	name := "../src/scss/utilities/_margin.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssUtilities_mixinsScss reads file data from disk. It returns an error on failure.
func SrcScssUtilities_mixinsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/utilities/_mixins.scss"
	name := "../src/scss/utilities/_mixins.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssUtilities_paddingScss reads file data from disk. It returns an error on failure.
func SrcScssUtilities_paddingScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/utilities/_padding.scss"
	name := "../src/scss/utilities/_padding.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssUtilities_panelsScss reads file data from disk. It returns an error on failure.
func SrcScssUtilities_panelsScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/utilities/_panels.scss"
	name := "../src/scss/utilities/_panels.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcScssUtilities_utilitiesScss reads file data from disk. It returns an error on failure.
func SrcScssUtilities_utilitiesScss() (*asset, error) {
	path := "/Users/jon/web/florence/src/scss/utilities/_utilities.scss"
	name := "../src/scss/utilities/_utilities.scss"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcServiceWorkerJs reads file data from disk. It returns an error on failure.
func SrcServiceWorkerJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/service-worker.js"
	name := "../src/service-worker.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// SrcWebpackConfigJs reads file data from disk. It returns an error on failure.
func SrcWebpackConfigJs() (*asset, error) {
	path := "/Users/jon/web/florence/src/webpack.config.js"
	name := "../src/webpack.config.js"
	bytes, err := bindataRead(path, name)
	if err != nil {
		return nil, err
	}

	fi, err := os.Stat(path)
	if err != nil {
		err = fmt.Errorf("Error reading asset info %s at %s: %v", name, path, err)
	}

	a := &asset{bytes: bytes, info: fi}
	return a, err
}

// Asset loads and returns the asset for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func Asset(name string) ([]byte, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("Asset %s can't read by error: %v", name, err)
		}
		return a.bytes, nil
	}
	return nil, fmt.Errorf("Asset %s not found", name)
}

// MustAsset is like Asset but panics when Asset would return an error.
// It simplifies safe initialization of global variables.
func MustAsset(name string) []byte {
	a, err := Asset(name)
	if err != nil {
		panic("asset: Asset(" + name + "): " + err.Error())
	}

	return a
}

// AssetInfo loads and returns the asset info for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func AssetInfo(name string) (os.FileInfo, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("AssetInfo %s can't read by error: %v", name, err)
		}
		return a.info, nil
	}
	return nil, fmt.Errorf("AssetInfo %s not found", name)
}

// AssetNames returns the names of the assets.
func AssetNames() []string {
	names := make([]string, 0, len(_bindata))
	for name := range _bindata {
		names = append(names, name)
	}
	return names
}

// _bindata is a table, holding each asset generator, mapped to its name.
var _bindata = map[string]func() (*asset, error){
	"../src/.DS_Store": SrcDs_store,
	"../src/app/App.jsx": SrcAppAppJsx,
	"../src/app/collections/Collections.jsx": SrcAppCollectionsCollectionsJsx,
	"../src/app/config/routes.js": SrcAppConfigRoutesJs,
	"../src/app/config/store.js": SrcAppConfigStoreJs,
	"../src/app/login/Login.jsx": SrcAppLoginLoginJsx,
	"../src/dist/css/main.css": SrcDistCssMainCss,
	"../src/dist/florence.bundle.js": SrcDistFlorenceBundleJs,
	"../src/dist/img/sprite.png": SrcDistImgSpritePng,
	"../src/dist/js/florence.bundle.js": SrcDistJsFlorenceBundleJs,
	"../src/dist/manifest.json": SrcDistManifestJson,
	"../src/dist/service-worker.js": SrcDistServiceWorkerJs,
	"../src/img/sprite.png": SrcImgSpritePng,
	"../src/index.html": SrcIndexHtml,
	"../src/index.js": SrcIndexJs,
	"../src/manifest.json": SrcManifestJson,
	"../src/package.json": SrcPackageJson,
	"../src/scss/components/_accordion.scss": SrcScssComponents_accordionScss,
	"../src/scss/components/_builder.scss": SrcScssComponents_builderScss,
	"../src/scss/components/_icons.scss": SrcScssComponents_iconsScss,
	"../src/scss/components/_markdown-editor.scss": SrcScssComponents_markdownEditorScss,
	"../src/scss/components/_network-status.scss": SrcScssComponents_networkStatusScss,
	"../src/scss/components/_page.scss": SrcScssComponents_pageScss,
	"../src/scss/components/_slider.scss": SrcScssComponents_sliderScss,
	"../src/scss/elements/_buttons.scss": SrcScssElements_buttonsScss,
	"../src/scss/elements/_forms.scss": SrcScssElements_formsScss,
	"../src/scss/elements/_inputs.scss": SrcScssElements_inputsScss,
	"../src/scss/elements/_nav.scss": SrcScssElements_navScss,
	"../src/scss/elements/_tables.scss": SrcScssElements_tablesScss,
	"../src/scss/elements/_typography.scss": SrcScssElements_typographyScss,
	"../src/scss/main.scss": SrcScssMainScss,
	"../src/scss/partials/_base.scss": SrcScssPartials_baseScss,
	"../src/scss/partials/_collections.scss": SrcScssPartials_collectionsScss,
	"../src/scss/partials/_colour-palette.scss": SrcScssPartials_colourPaletteScss,
	"../src/scss/partials/_elements.scss": SrcScssPartials_elementsScss,
	"../src/scss/partials/_fonts.scss": SrcScssPartials_fontsScss,
	"../src/scss/partials/_jqui.scss": SrcScssPartials_jquiScss,
	"../src/scss/partials/_publish.scss": SrcScssPartials_publishScss,
	"../src/scss/partials/_reset.scss": SrcScssPartials_resetScss,
	"../src/scss/partials/_shame.scss": SrcScssPartials_shameScss,
	"../src/scss/partials/_utilities.scss": SrcScssPartials_utilitiesScss,
	"../src/scss/partials/_workspace.scss": SrcScssPartials_workspaceScss,
	"../src/scss/utilities/_display.scss": SrcScssUtilities_displayScss,
	"../src/scss/utilities/_grid.scss": SrcScssUtilities_gridScss,
	"../src/scss/utilities/_margin.scss": SrcScssUtilities_marginScss,
	"../src/scss/utilities/_mixins.scss": SrcScssUtilities_mixinsScss,
	"../src/scss/utilities/_padding.scss": SrcScssUtilities_paddingScss,
	"../src/scss/utilities/_panels.scss": SrcScssUtilities_panelsScss,
	"../src/scss/utilities/_utilities.scss": SrcScssUtilities_utilitiesScss,
	"../src/service-worker.js": SrcServiceWorkerJs,
	"../src/webpack.config.js": SrcWebpackConfigJs,
}

// AssetDir returns the file names below a certain
// directory embedded in the file by go-bindata.
// For example if you run go-bindata on data/... and data contains the
// following hierarchy:
//     data/
//       foo.txt
//       img/
//         a.png
//         b.png
// then AssetDir("data") would return []string{"foo.txt", "img"}
// AssetDir("data/img") would return []string{"a.png", "b.png"}
// AssetDir("foo.txt") and AssetDir("notexist") would return an error
// AssetDir("") will return []string{"data"}.
func AssetDir(name string) ([]string, error) {
	node := _bintree
	if len(name) != 0 {
		cannonicalName := strings.Replace(name, "\\", "/", -1)
		pathList := strings.Split(cannonicalName, "/")
		for _, p := range pathList {
			node = node.Children[p]
			if node == nil {
				return nil, fmt.Errorf("Asset %s not found", name)
			}
		}
	}
	if node.Func != nil {
		return nil, fmt.Errorf("Asset %s not found", name)
	}
	rv := make([]string, 0, len(node.Children))
	for childName := range node.Children {
		rv = append(rv, childName)
	}
	return rv, nil
}

type bintree struct {
	Func     func() (*asset, error)
	Children map[string]*bintree
}
var _bintree = &bintree{nil, map[string]*bintree{
	"..": &bintree{nil, map[string]*bintree{
		"src": &bintree{nil, map[string]*bintree{
			".DS_Store": &bintree{SrcDs_store, map[string]*bintree{}},
			"app": &bintree{nil, map[string]*bintree{
				"App.jsx": &bintree{SrcAppAppJsx, map[string]*bintree{}},
				"collections": &bintree{nil, map[string]*bintree{
					"Collections.jsx": &bintree{SrcAppCollectionsCollectionsJsx, map[string]*bintree{}},
				}},
				"config": &bintree{nil, map[string]*bintree{
					"routes.js": &bintree{SrcAppConfigRoutesJs, map[string]*bintree{}},
					"store.js": &bintree{SrcAppConfigStoreJs, map[string]*bintree{}},
				}},
				"login": &bintree{nil, map[string]*bintree{
					"Login.jsx": &bintree{SrcAppLoginLoginJsx, map[string]*bintree{}},
				}},
			}},
			"dist": &bintree{nil, map[string]*bintree{
				"css": &bintree{nil, map[string]*bintree{
					"main.css": &bintree{SrcDistCssMainCss, map[string]*bintree{}},
				}},
				"florence.bundle.js": &bintree{SrcDistFlorenceBundleJs, map[string]*bintree{}},
				"img": &bintree{nil, map[string]*bintree{
					"sprite.png": &bintree{SrcDistImgSpritePng, map[string]*bintree{}},
				}},
				"js": &bintree{nil, map[string]*bintree{
					"florence.bundle.js": &bintree{SrcDistJsFlorenceBundleJs, map[string]*bintree{}},
				}},
				"manifest.json": &bintree{SrcDistManifestJson, map[string]*bintree{}},
				"service-worker.js": &bintree{SrcDistServiceWorkerJs, map[string]*bintree{}},
			}},
			"img": &bintree{nil, map[string]*bintree{
				"sprite.png": &bintree{SrcImgSpritePng, map[string]*bintree{}},
			}},
			"index.html": &bintree{SrcIndexHtml, map[string]*bintree{}},
			"index.js": &bintree{SrcIndexJs, map[string]*bintree{}},
			"manifest.json": &bintree{SrcManifestJson, map[string]*bintree{}},
			"package.json": &bintree{SrcPackageJson, map[string]*bintree{}},
			"scss": &bintree{nil, map[string]*bintree{
				"components": &bintree{nil, map[string]*bintree{
					"_accordion.scss": &bintree{SrcScssComponents_accordionScss, map[string]*bintree{}},
					"_builder.scss": &bintree{SrcScssComponents_builderScss, map[string]*bintree{}},
					"_icons.scss": &bintree{SrcScssComponents_iconsScss, map[string]*bintree{}},
					"_markdown-editor.scss": &bintree{SrcScssComponents_markdownEditorScss, map[string]*bintree{}},
					"_network-status.scss": &bintree{SrcScssComponents_networkStatusScss, map[string]*bintree{}},
					"_page.scss": &bintree{SrcScssComponents_pageScss, map[string]*bintree{}},
					"_slider.scss": &bintree{SrcScssComponents_sliderScss, map[string]*bintree{}},
				}},
				"elements": &bintree{nil, map[string]*bintree{
					"_buttons.scss": &bintree{SrcScssElements_buttonsScss, map[string]*bintree{}},
					"_forms.scss": &bintree{SrcScssElements_formsScss, map[string]*bintree{}},
					"_inputs.scss": &bintree{SrcScssElements_inputsScss, map[string]*bintree{}},
					"_nav.scss": &bintree{SrcScssElements_navScss, map[string]*bintree{}},
					"_tables.scss": &bintree{SrcScssElements_tablesScss, map[string]*bintree{}},
					"_typography.scss": &bintree{SrcScssElements_typographyScss, map[string]*bintree{}},
				}},
				"main.scss": &bintree{SrcScssMainScss, map[string]*bintree{}},
				"partials": &bintree{nil, map[string]*bintree{
					"_base.scss": &bintree{SrcScssPartials_baseScss, map[string]*bintree{}},
					"_collections.scss": &bintree{SrcScssPartials_collectionsScss, map[string]*bintree{}},
					"_colour-palette.scss": &bintree{SrcScssPartials_colourPaletteScss, map[string]*bintree{}},
					"_elements.scss": &bintree{SrcScssPartials_elementsScss, map[string]*bintree{}},
					"_fonts.scss": &bintree{SrcScssPartials_fontsScss, map[string]*bintree{}},
					"_jqui.scss": &bintree{SrcScssPartials_jquiScss, map[string]*bintree{}},
					"_publish.scss": &bintree{SrcScssPartials_publishScss, map[string]*bintree{}},
					"_reset.scss": &bintree{SrcScssPartials_resetScss, map[string]*bintree{}},
					"_shame.scss": &bintree{SrcScssPartials_shameScss, map[string]*bintree{}},
					"_utilities.scss": &bintree{SrcScssPartials_utilitiesScss, map[string]*bintree{}},
					"_workspace.scss": &bintree{SrcScssPartials_workspaceScss, map[string]*bintree{}},
				}},
				"utilities": &bintree{nil, map[string]*bintree{
					"_display.scss": &bintree{SrcScssUtilities_displayScss, map[string]*bintree{}},
					"_grid.scss": &bintree{SrcScssUtilities_gridScss, map[string]*bintree{}},
					"_margin.scss": &bintree{SrcScssUtilities_marginScss, map[string]*bintree{}},
					"_mixins.scss": &bintree{SrcScssUtilities_mixinsScss, map[string]*bintree{}},
					"_padding.scss": &bintree{SrcScssUtilities_paddingScss, map[string]*bintree{}},
					"_panels.scss": &bintree{SrcScssUtilities_panelsScss, map[string]*bintree{}},
					"_utilities.scss": &bintree{SrcScssUtilities_utilitiesScss, map[string]*bintree{}},
				}},
			}},
			"service-worker.js": &bintree{SrcServiceWorkerJs, map[string]*bintree{}},
			"webpack.config.js": &bintree{SrcWebpackConfigJs, map[string]*bintree{}},
		}},
	}},
}}

// RestoreAsset restores an asset under the given directory
func RestoreAsset(dir, name string) error {
	data, err := Asset(name)
	if err != nil {
		return err
	}
	info, err := AssetInfo(name)
	if err != nil {
		return err
	}
	err = os.MkdirAll(_filePath(dir, filepath.Dir(name)), os.FileMode(0755))
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(_filePath(dir, name), data, info.Mode())
	if err != nil {
		return err
	}
	err = os.Chtimes(_filePath(dir, name), info.ModTime(), info.ModTime())
	if err != nil {
		return err
	}
	return nil
}

// RestoreAssets restores an asset under the given directory recursively
func RestoreAssets(dir, name string) error {
	children, err := AssetDir(name)
	// File
	if err != nil {
		return RestoreAsset(dir, name)
	}
	// Dir
	for _, child := range children {
		err = RestoreAssets(dir, filepath.Join(name, child))
		if err != nil {
			return err
		}
	}
	return nil
}

func _filePath(dir, name string) string {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	return filepath.Join(append([]string{dir}, strings.Split(cannonicalName, "/")...)...)
}

