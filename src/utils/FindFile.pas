{TFindFile

Article:
http://delphi.about.com/library/weekly/aa052300a.htm

Tired of using FindFirst, Next and Close?
Come see how to encapsulate all those functions
in a single "find-files-recursively" component.
It's easy to use, free and with code.


********************************************
Zarko Gajic
About.com Guide to Delphi Programming
http://delphi.about.com
email: delphi.guide@about.com
********************************************

}

unit FindFile;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs, FileCtrl;

type
  TFileAttrKind = (ffaReadOnly, ffaHidden, ffaSysFile, ffaVolumeID, ffaDirectory, ffaArchive, ffaAnyFile);
  TFileAttr = set of TFileAttrKind;

  TFindFile = class(TComponent)
  private
    s : TStringList;

    fSubFolder : boolean;
    fAttr: TFileAttr;
    fPath : string;
    fFileMask : string;
    fExcludeFileMask :TStringList;

    procedure SetPath(Value: string);
    procedure FileSearch(const inPath : string);
    procedure SetExcludeFileMask(Value:TStringList);
  public
    constructor Create(AOwner: TComponent); override;
    destructor Destroy; override;

    function SearchForFiles: TStringList;
  published
    property FileAttr: TFileAttr read fAttr write fAttr;
    property InSubFolders : boolean read fSubFolder write fSubFolder;
    property Path : string read fPath write SetPath;
    property FileMask : string read fFileMask write fFileMask ;
    property ExcludeFileMask :TStringList read fExcludeFileMask write SetExcludeFileMask;
  end;

procedure Register;

implementation

procedure Register;
begin
  RegisterComponents('CherryComponents', [TFindFile]);
end;

constructor TFindFile.Create(AOwner: TComponent);
begin
  inherited Create(AOwner);
  Path := IncludeTrailingBackslash(GetCurrentDir); 
  FileMask := '*.*';
  FileAttr := [ffaAnyFile];
  s := TStringList.Create;
  fExcludeFileMask:=TStringList.Create;
end;

destructor TFindFile.Destroy;
begin
  s.Free;
  fExcludeFileMask.Free;
  inherited Destroy;
end;

procedure TFindFile.SetExcludeFileMask(Value:TStringList);
begin
 fExcludeFileMask.Assign(value);
end;

procedure TFindFile.SetPath(Value: string);
begin
  if fPath <> Value then
  begin
    if Value <> '' then
      if DirectoryExists(Value) then
        fPath := IncludeTrailingBackslash(Value);
  end;
end;

function TFindFile.SearchForFiles: TStringList;
begin
  s.Clear;
  try
    FileSearch(Path);
  finally
    Result := s;
  end;
end;

procedure TFindFile.FileSearch(const InPath : string);
var Rec  : TSearchRec;
    Attr,i : integer; flag:Boolean;
begin
Attr := 0;
if ffaReadOnly in FileAttr then Attr := Attr + faReadOnly;
if ffaHidden in FileAttr then Attr := Attr + faHidden;
if ffaSysFile in FileAttr then Attr := Attr + faSysFile;
if ffaVolumeID in FileAttr then Attr := Attr + faVolumeID;
if ffaDirectory in FileAttr then Attr := Attr + faDirectory;
if ffaArchive in FileAttr then Attr := Attr + faArchive;
if ffaAnyFile in FileAttr then Attr := Attr + faAnyFile;

if SysUtils.FindFirst(inPath + FileMask, Attr, Rec) = 0 then
 try
   repeat
     flag:=false;
     for I := 0 to fExcludeFileMask.Count - 1 do
       if Pos(fExcludeFileMask.Strings[i],Rec.Name)>0 then flag:=true;
     If flag=false Then s.Add(inPath + Rec.Name);
   until SysUtils.FindNext(Rec) <> 0;
 finally
   SysUtils.FindClose(Rec);
 end;

If not InSubFolders then Exit;

if SysUtils.FindFirst(inPath + '*.*', faDirectory, Rec) = 0 then
 try
   repeat
   if ((Rec.Attr and faDirectory) > 0) and (Rec.Name<>'.') and (Rec.Name<>'..') then
     begin
       FileSearch(IncludeTrailingBackslash(inPath + Rec.Name));
     end;
   until SysUtils.FindNext(Rec) <> 0;
 finally
   SysUtils.FindClose(Rec);
 end;
end; 

end.

