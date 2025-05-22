"use client";

import { useState } from "react";
import { PageLayout } from "@/components/grandesgn/page-layout";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash, Plus, Edit, Save, X } from "lucide-react";

type Item = {
    id: number;
    nome: string;
    preco: number;
};

function EditableTable({
    items,
    setItems,
    title,
}: {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    title: string;
}) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<{ nome: string; preco: number }>({
        nome: "",
        preco: 0,
    });

    const startEdit = (item: Item) => {
        setEditingId(item.id);
        setEditData({ nome: item.nome, preco: item.preco });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const saveEdit = () => {
        if (editingId === null) return;
        setItems((old) =>
            old.map((item) =>
                item.id === editingId
                    ? { ...item, nome: editData.nome, preco: editData.preco }
                    : item
            )
        );
        setEditingId(null);
    };

    const removeItem = (id: number) => {
        setItems((old) => old.filter((item) => item.id !== id));
        if (editingId === id) {
            setEditingId(null);
        }
    };

    const addItem = () => {
        const newId = items.length ? items[items.length - 1].id + 1 : 1;
        const newItem = { id: newId, nome: "", preco: 0 };
        setItems((old) => [...old, newItem]);
        setEditingId(newId);
        setEditData({ nome: "", preco: 0 });
    };

    return (
        <Card className="shadow-lg border rounded-2xl mt-6 w-full">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={addItem}
                    className="gap-1"
                    disabled={editingId !== null} // opcional: bloqueia adicionar durante edição
                >
                    <Plus className="w-4 h-4" />
                    Adicionar
                </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted">
                            <TableHead className="w-1/2">Nome</TableHead>
                            <TableHead className="w-1/4">Preço (R$)</TableHead>
                            <TableHead className="w-1/4 text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(({ id, nome, preco }) => {
                            const isEditing = id === editingId;
                            return (
                                <TableRow key={id} className="group hover:bg-accent">
                                    <TableCell>
                                        {isEditing ? (
                                            <Input
                                                value={editData.nome}
                                                onChange={(e) =>
                                                    setEditData((old) => ({ ...old, nome: e.target.value }))
                                                }
                                                placeholder="Nome do item"
                                                autoFocus
                                                className="bg-transparent focus-visible:ring-1 focus-visible:ring-primary"
                                            />
                                        ) : (
                                            nome
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                min={0}
                                                step={0.01}
                                                value={editData.preco}
                                                onChange={(e) =>
                                                    setEditData((old) => ({
                                                        ...old,
                                                        preco: Number(e.target.value) || 0,
                                                    }))
                                                }
                                                placeholder="0.00"
                                                className="bg-transparent focus-visible:ring-1 focus-visible:ring-primary"
                                            />
                                        ) : (
                                            preco.toFixed(2)
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center flex justify-center gap-2">
                                        {isEditing ? (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={saveEdit}
                                                    title="Salvar"
                                                >
                                                    <Save className="w-5 h-5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={cancelEdit}
                                                    title="Cancelar"
                                                >
                                                    <X className="w-5 h-5" />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => startEdit({ id, nome, preco })}
                                                    title="Editar"
                                                    disabled={editingId !== null}
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeItem(id)}
                                                    className="text-destructive hover:bg-destructive/10"
                                                    disabled={editingId !== null}
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                                    Nenhum {title.toLowerCase()} adicionado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function EditarMateriaisPage() {
    const [materiais, setMateriais] = useState<Item[]>([
        { id: 1, nome: "Cimento", preco: 50 },
        { id: 2, nome: "Areia", preco: 30 },
    ]);

    const [madeiras, setMadeiras] = useState<Item[]>([
        { id: 1, nome: "Pinho", preco: 25 },
        { id: 2, nome: "Mogno", preco: 100 },
    ]);

    const [telhas, setTelhas] = useState<Item[]>([
        { id: 1, nome: "Telha Cerâmica", preco: 10 },
        { id: 2, nome: "Telha Metálica", preco: 20 },
    ]);

    const links = [
        { label: "Home", href: "/home" },
        { label: "Editar Materiais", href: "/home/editar-materiais" },
    ];

    return (
        <PageLayout links={links}>
            <div className="max-w-8xl mx-auto mt-10">
                {/* Container para alinhar o texto e o menu à esquerda */}
                <h1 className="text-4xl font-bold mb-4">Editar Materiais</h1>
                <Tabs defaultValue="materiais" className="w-full">
                    <TabsList className="bg-muted p-1 rounded-xl border w-full max-w-xs">
                        <TabsTrigger
                            value="materiais"
                            className="px-6 py-2 font-medium rounded-t-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                        >
                            Materiais
                        </TabsTrigger>
                        <TabsTrigger
                            value="madeiras"
                            className="px-6 py-2 font-medium rounded-t-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                        >
                            Madeiras
                        </TabsTrigger>
                        <TabsTrigger
                            value="telhas"
                            className="px-6 py-2 font-medium rounded-t-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                        >
                            Telhas
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="materiais" className="w-full mt-6">
                        <EditableTable
                            items={materiais}
                            setItems={setMateriais}
                            title="Materiais"
                        />
                    </TabsContent>

                    <TabsContent value="madeiras" className="w-full mt-6">
                        <EditableTable
                            items={madeiras}
                            setItems={setMadeiras}
                            title="Madeiras"
                        />
                    </TabsContent>

                    <TabsContent value="telhas" className="w-full mt-6">
                        <EditableTable
                            items={telhas}
                            setItems={setTelhas}
                            title="Telhas"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </PageLayout>
    );
}