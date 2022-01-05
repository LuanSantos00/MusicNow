import { stringify } from '@angular/compiler/src/util';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MusicDTO } from '../dto/music.dto';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'musicNow';
  public controls: any;
  public dadosForm: FormGroup;
  public linkVagalume:any;
  public musica!: MusicDTO[];
  public erro!: string;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { 

    this.dadosForm = this.formBuilder.group({
      
      nomeCantor:['',Validators.required],
      nomeMusica: ['',Validators.required],
      
    });

    this.controls = {
      nomeCantor: this.dadosForm.get('nomeCantor'),
      nomeMusica: this.dadosForm.get('nomeMusica'),
    }
  }
  
  ngOnInit(): void {
   

  }

  public async buscar(controls:any){
    let music = []
    if(controls.nomeCantor.value && controls.nomeMusica.value){
      const response = await fetch("https://api.vagalume.com.br/search.php?apikey=e0c57ad1e8a8d35a1b0a884e3d239d87&art="+controls.nomeCantor.value+"&mus="+controls.nomeMusica.value)
      const json = await response.json()
        try{
          music.push({artista : json.art.name, musica:json.mus[0].name, letra:json.mus[0].text });
          this.linkVagalume = json.art.url;
          this.musica = music;
          }
          catch(err){
          this.erro = "Erro ao encontar a letra"
          this.dadosForm.reset();
          this.musica = [];
            setInterval(() => { 
              this.erro = ""; 
            }, 2000);  
        }
       console.log(json);
    }
    else{
      this.toastr.error("Informe o nome do Cantor e sua respectiva música!");
    }
    
  }

  visitar(){
    window.open(this.linkVagalume, '_blank');
  }
  limpar(){
    this.dadosForm.reset();
    this.musica = [];
  }
 
}
