function f_map_control
         (
           id, //скрываемый объект
           cid, //скрывающий объект
           text_for_show, //текст для скрывающего объекта: показать
           text_for_hide  //текст для скрывающего объекта: скрыть
         )
{
  display = document.getElementById(id).style.display;
  if(display=='none')
  {
    document.getElementById(id).style.display='block';
    document.getElementById(cid).innerHTML = text_for_hide;
  }else
  {
    document.getElementById(id).style.display='none';
    document.getElementById(cid).innerHTML = text_for_show;
  }
}