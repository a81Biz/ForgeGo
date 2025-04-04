package app

import (
	"fmt"
	"io/fs"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func InitGoModule(moduleName string) error {
	if moduleName == "" {
		return fmt.Errorf("el nombre del módulo no puede estar vacío")
	}

	targetDir := "/workspace/output/" + moduleName
	repoURL := "https://github.com/a81Biz/go-docker-template.git"

	fmt.Println("Clonando repositorio base...")
	cmd := exec.Command("git", "clone", repoURL, targetDir)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("error al clonar el repositorio: %w", err)
	}

	fmt.Println("Reemplazando nombres en go.mod...")
	goModPath := filepath.Join(targetDir, "go.mod")
	data, err := ioutil.ReadFile(goModPath)
	if err != nil {
		return fmt.Errorf("no se pudo leer go.mod: %w", err)
	}
	newContent := strings.ReplaceAll(string(data), "module go-docker-template", "module "+moduleName)
	if err := ioutil.WriteFile(goModPath, []byte(newContent), 0644); err != nil {
		return fmt.Errorf("no se pudo escribir go.mod: %w", err)
	}

	fmt.Println("Reemplazando '__MODULE_NAME__' en archivos del módulo...")
	err = filepath.WalkDir(targetDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		if strings.HasSuffix(path, ".yml") || strings.HasSuffix(path, ".json") || strings.HasSuffix(path, ".toml") || strings.HasSuffix(path, ".go") {
			content, err := ioutil.ReadFile(path)
			if err != nil {
				return err
			}
			replaced := strings.ReplaceAll(string(content), "__MODULE_NAME__", moduleName)
			if err := ioutil.WriteFile(path, []byte(replaced), 0644); err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		return fmt.Errorf("error al reemplazar placeholders: %w", err)
	}

	fmt.Println("✅ Módulo '" + moduleName + "' creado exitosamente en " + targetDir)
	return nil
}