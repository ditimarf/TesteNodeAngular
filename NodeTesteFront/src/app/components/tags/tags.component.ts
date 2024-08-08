import { Component, OnInit } from '@angular/core';
import { tagModel } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{
  tags: tagModel[] = [];
  tag: tagModel = new tagModel(0, '');
  isEditing = false;

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  addTag(): void {
    if (this.isEditing) {
      this.tagService.updateTag(this.tag).subscribe(() => {
        this.getTags();
        this.isEditing = false;
        this.clearTag()
      });
    } else {
      this.tagService.tag(this.tag).subscribe(() => {
        this.getTags();
        this.clearTag()
      });
    }
  }

  editTag(tag: tagModel): void {
    this.tag = { ...tag };
    this.isEditing = true;
  }

  cancelEdition(){
    this.clearTag()
    this.isEditing = false;
  }

  deleteTag(codigo: number): void {
    this.tagService.deleteTag(codigo).subscribe(() => {
      this.getTags();
    });
  }

  private clearTag(){
    this.tag = new tagModel(0, '')
  }

}
