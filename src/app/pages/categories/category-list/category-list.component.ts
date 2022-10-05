import { Component, OnInit } from "@angular/core";

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
      error: () => alert("🔴 Erro ao carregar a lista de categorias"),
    });
  }

  deleteCategory(id: number): void {
    const mustDelete = confirm("Deseja realmente excluir este item?");
    if (!mustDelete) return;

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
      },
      error: () => alert("🔴 Erro ao deletar categoria"),
    });
  }
}
