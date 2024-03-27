<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'amount', 'user_id', 'customer_id'
    ];

    public function user(){
        return $this->belongsTo('App\Models\User');
    }

    public function customer() {
        return $this->belongsTo('App\Models\Customer');
    }

    public function installments() {
        return $this->hasMany("App\Models\Installment");
    }

    public function to_json() {
        return [
            "id"=>$this->id,
            "created_at"=>$this->created_at
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($project) {
            $project->installments->delete();
        });
    }
}
