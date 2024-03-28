<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $table = "expenses";

    protected $fillable = [
      "amount", "project_id"
    ];

    public function project() {
        $this->belongsTo("App\Models\Project");
    }
}
