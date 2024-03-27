<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    protected $table = "installments";

    protected $fillable = [
        "amount", "project_id"
    ];

    public function project() {
        $this->belongsTo("App\Models\Project");
    }
}
